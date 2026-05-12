import Joi from 'joi';

export const LoginSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Username harus berupa teks',
            'string.empty': 'Username tidak boleh kosong',
            'string.min': 'Username minimal harus 3 karakter',
            'string.max': 'Username maksimal 30 karakter',
            'string.alphanum': 'Username hanya boleh berisi huruf dan angka',
            'any.required': 'Username wajib diisi'
        }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.empty': 'Password tidak boleh kosong',
            'string.min': 'Password minimal harus 8 karakter',
            'any.required': 'Password wajib diisi'
        })
});