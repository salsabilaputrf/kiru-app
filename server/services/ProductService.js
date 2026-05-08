import { AppDataSource } from '../configs/Db.js';
import * as productDomain from "../domains/ProductDomain.js";
import { DeleteStockByProductDomain } from '../domains/StockDomain.js'
import { ProductListResponse } from "../models/responses/ProductResponse.js";
import { ProductSchema } from "../models/schemas/ProductSchema.js"
import { getPagination, paginationMeta } from "../utils/pagination.js";
import {CustomError} from "../middleware/ErrorHandler.js";

export async function GetAllProductsService(query){
    const { page, limit, offset } = getPagination(query);
    
    const { rows, total } = await productDomain.GetAllProductsDomain({ 
        limit, 
        offset 
    });

    const pagination = paginationMeta(total, page, limit);

    const response = ProductListResponse(rows, pagination ) 
    return {
        success: true,
        message: 'Data produk berhasil diambil',
        data: response
    }
};

export async function DeleteProductService(id) {
    const queryRunner = AppDataSource.createQueryRunner();

    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const exist = await productDomain.FindProductByIdDomain(id);
        
        if (!exist) {
            throw new CustomError('Produk tidak ditemukan', 404);
        }

        await DeleteStockByProductDomain(id, queryRunner.manager);
        await productDomain.DeleteProductDomain(id, queryRunner.manager);
        
        await queryRunner.commitTransaction();
        
        return {
            success: true,
            message: 'Berhasil menghapus produk',
            data: null 
        };

    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new CustomError(
            error.message || "Gagal menghapus produk", 
            error.statusCode || 500
        );
    }finally {

        await queryRunner.release();
    }
}

export async function CreateProductService(productData) {
     
    const { error, value } = ProductSchema.validate(productData, { 
        abortEarly: false, 
        stripUnknown: true 
    });

    if (error) {
        const errorMessages = error.details.map(d => d.message.replace(/"/g, '')).join(', ');
        throw new CustomError(`Validasi gagal: ${errorMessages}`, 400);
    }

    const baseUnits = value.units.filter(u => u.is_base_unit);
    if (baseUnits.length !== 1) {
        throw new CustomError('Harus ada tepat satu satuan dasar', 422);
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();


        const product = await productDomain.CreateProductDomain({ name: value.name }, queryRunner.manager);


        for (const unit of value.units) {
            await productDomain.InsertProductUnitDomain({
                productId: product.id,
                unitName: unit.unit_name,
                multiplier: unit.multiplier,
                isBaseUnit: unit.is_base_unit,
                purchasePrice: unit.purchase_price,
                sellingPrice: unit.selling_price,
            }, queryRunner.manager);
        }


        if (value.categories.length > 0) {
            await productDomain.SyncProductCategoriesDomain(product.id, value.categories, queryRunner.manager);
        }

        await queryRunner.commitTransaction();


        const result = await productDomain.FindProductByIdDomain(product.id);
        return {
            success: true,
            message: "Produk berhasil dibuat",
            data: formatProductResponse(result)
        };

    } catch (error) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        throw new CustomError(error.message, error.statusCode || 500);
    } finally {
        await queryRunner.release();
    }
}

export async function UpdateProductService(id, updateData) {
    const { error, value } = ProductSchema.validate(updateData, { 
        abortEarly: false, 
        stripUnknown: true 
    });

    if (error) {
        const errorMessages = error.details.map(d => d.message.replace(/"/g, '')).join(', ');
        throw new CustomError(`Validasi update gagal: ${errorMessages}`, 400);
    }

    const baseUnits = value.units.filter(u => u.is_base_unit);
    if (baseUnits.length !== 1) {
        throw new CustomError('Harus ada tepat satu satuan dasar', 422);
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();

        const existing = await productDomain.FindProductByIdDomain(id, queryRunner.manager);
        if (!existing) {
            throw new CustomError("Produk tidak ditemukan", 404);
        }


        await productDomain.UpdateProductDomain(id, { name: value.name }, queryRunner.manager);

        await productDomain.DeleteUnitsByProductIdDomain(id, queryRunner.manager);
        for (const unit of value.units) {
            await productDomain.InsertProductUnitDomain({
                productId: id,
                unitName: unit.unit_name,
                multiplier: unit.multiplier,
                isBaseUnit: unit.is_base_unit,
                purchasePrice: unit.purchase_price,
                sellingPrice: unit.selling_price,
            }, queryRunner.manager);
        }

       
        if (value.categories.length > 0) {
            await productDomain.SyncProductCategoriesDomain(id, value.categories, queryRunner.manager);
        }

        await queryRunner.commitTransaction();

        const updatedProduct = await productDomain.FindProductByIdDomain(id);
        return {
            success: true,
            message: "Produk berhasil diperbarui",
            data: formatProductResponse(updatedProduct)
        };

    } catch (error) {
        if (queryRunner.isTransactionActive) await queryRunner.rollbackTransaction();
        throw new CustomError(error.message, error.statusCode || 500);
    } finally {
        await queryRunner.release();
    }
}

function formatProductResponse(product) {
    return {
        id: product.id,
        name: product.name,
        categories: (product.categories || []).map(c => ({ id: c.id, name: c.name })),
        units: (product.units || []).map(u => ({
            id: u.id,
            name: u.name,
            multiplier: u.multiplier,
            isBase: Boolean(u.is_base),
            price: {
                purchase: u.purchase_price,
                selling: u.selling_price,
            },
        })),
        stocks: (product.stocks || []).map(s => ({
            branch: s.branch_name,
            qty: s.qty
        }))
    };
}