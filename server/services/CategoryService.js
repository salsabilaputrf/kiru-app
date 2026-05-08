import { FindAllCategoriesDomain, CreateCategoryDomain, FindCategoryByIdDomain, FindCategoryByNameDomain, UpdateCategoryDomain, DeleteCategoryDomain } from "../domains/CategoryDomain.js";
import {CustomError} from "../middleware/ErrorHandler.js";

export async function GetAllCategoriesService(){
    try {
         
        const categories = await FindAllCategoriesDomain();
        return { 
            success: true,
            message: 'Berhasil mengambil data categories',
            data: {
                categories: categories.map((c) => ({
                    id:           c.id,
                    name:         c.name,
                    productCount: Number(c.product_count ?? 0),
                }))
            }, 
        };
    }catch (error) {

        throw new CustomError("Gagal mengambil data categories: " + error.message, error.statusCode || 500);
        next(error);
    } 
};

export async function CreateCategoryService({ name }) {
    try {
        const trimmed = name?.trim();
        if (!trimmed) {
            throw new CustomError('Nama kategori tidak boleh kosong', 422);
        }

        const duplicate = await FindCategoryByNameDomain(trimmed);
        if (duplicate) {
            throw new CustomError(`Kategori "${trimmed}" sudah ada`, 409);
        }

        const id = await CreateCategoryDomain({ name: trimmed });
        const created = await FindCategoryByIdDomain(id);

        return {
            success: true,
            message: 'Berhasil membuat kategori baru',
            data: null
        };
    } catch (error) {
        throw new CustomError(error.message, error.statusCode || 500);
    }
}

export async function UpdateCategoryService(id, { name }) {
    try {
        const trimmed = name?.trim();
        if (!trimmed) {
            throw new CustomError('Nama kategori tidak boleh kosong', 422);
        }

        const existing = await FindCategoryByIdDomain(id);
        if (!existing) {
            throw new CustomError('Kategori tidak ditemukan', 404);
        }

        const duplicate = await FindCategoryByNameDomain(trimmed);
        if (duplicate && duplicate.id !== id) {
            throw new CustomError(`Kategori "${trimmed}" sudah ada`, 409);
        }

        await UpdateCategoryDomain(id, { name: trimmed });
        const updated = await FindCategoryByIdDomain(id);

        return {
            success: true,
            message: 'Berhasil memperbarui kategori',
            data: {
                category: {
                    id:   updated.id,
                    name: updated.name,
                }
            }
        };
    } catch (error) {
        throw new CustomError(error.message, error.statusCode || 500);
    }
}

export async function DeleteCategoryService(id) {
    try {
        const existing = await FindCategoryByIdDomain(id);
        if (!existing) {
            throw new CustomError('Kategori tidak ditemukan', 404);
        }

        await DeleteCategoryDomain(id);

        return {
            success: true,
            message: 'Berhasil menghapus kategori',
        };
    } catch (error) {
        throw new CustomError(error.message, error.statusCode || 500);
    }
}