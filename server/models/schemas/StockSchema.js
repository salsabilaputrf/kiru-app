import Joi from 'joi';

export const AddStockSchema = Joi.object({
    productId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
        'any.required': 'ID Produk wajib diisi',
        'string.base': 'ID Produk tidak valid',
        'string.guid': 'Format ID Produk harus berupa UUID'
    }),
    branchId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
        'any.required': 'ID Cabang wajib diisi',
        'string.base': 'ID Cabang tidak valid',
        'string.guid': 'Format ID Cabang harus berupa UUID'
    }),
    qty: Joi.number().min(1).required().messages({
        'any.required': 'Jumlah stok wajib diisi',
        'number.min': 'Jumlah stok minimal adalah 1',
        'number.base': 'Jumlah stok harus berupa angka'
    })
});