import Joi from 'joi';

const transactionItemSchema = Joi.object({
    product_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
        'string.guid':  'product_id harus berupa UUID yang valid',
        'any.required': 'product_id wajib diisi',
    }),
    product_unit_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
        'string.guid':  'product_unit_id harus berupa UUID yang valid',
        'any.required': 'product_unit_id wajib diisi',
    }),

    quantity: Joi.number().precision(2).min(0.01).required().messages({
        'number.min':       'quantity minimal 0.01',
        'number.precision': 'quantity maksimal 2 angka desimal',
        'any.required':     'quantity wajib diisi',
    }),
    multiplier: Joi.number().min(1).default(1).messages({
        'number.min': 'multiplier minimal 1',
    }),

    unit_price: Joi.number().precision(2).min(0).required().messages({
        'number.min':   'unit_price tidak boleh negatif',
        'any.required': 'unit_price wajib diisi',
    }),
});

export const CreateTransactionSchema = Joi.object({
    branch_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
        'string.guid':  'branch_id harus berupa UUID yang valid',
        'any.required': 'branch_id wajib diisi',
    }),

    cash_amount: Joi.number().integer().min(1).required().messages({
        'number.min':   'cash_amount harus lebih dari 0',
        'any.required': 'cash_amount wajib diisi',
    }),
    items: Joi.array().items(transactionItemSchema).min(1).required().messages({
        'array.min':    'Minimal ada 1 item transaksi',
        'any.required': 'items wajib diisi',
    }),
});