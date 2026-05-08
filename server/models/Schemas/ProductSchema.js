import Joi from 'joi';

export const ProductSchema = Joi.object({
    name: Joi.string().required(),
    categories: Joi.array().items(Joi.string().guid({ version: 'uuidv4' })).default([]),
    units: Joi.array().items(Joi.object({
        unit_name: Joi.string().required(),
        multiplier: Joi.number().min(1).default(1),
        is_base_unit: Joi.boolean().default(false),
        purchase_price: Joi.number().min(0).default(0),
        selling_price: Joi.number().min(0).default(0),
    })).min(1).required().messages({
        'array.min': 'Minimal satu satuan harus diisi'
    })
});