import Joi from 'joi';

export const CreateUserSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(150) 
        .required()
        .messages({
            'string.min': 'Nama minimal 2 karakter',
            'string.max': 'Nama maksimal 150 karakter',
            'any.required': 'Nama wajib diisi'
        }),

    username: Joi.string()
        .min(3)
        .max(100) 
        .alphanum()
        .required()
        .messages({
            'string.max': 'Username maksimal 100 karakter',
            'any.required': 'Username wajib diisi'
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .max(150) 
        .required()
        .messages({
            'string.email': 'Format email tidak valid',
            'any.required': 'Email wajib diisi'
        }),

    password: Joi.string()
        .min(8)
        .max(255)
        .alphanum() 
        .required()
        .custom((value, helpers) => {
            
            const hasLetter = /[a-zA-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            
            if (!hasLetter || !hasNumber) {
                return helpers.message('Password harus mengandung kombinasi huruf dan angka');
            }
            return value;
        })
        .messages({
            'string.min': 'Password minimal harus 8 karakter',
            'string.alphanum': 'Password hanya boleh berisi huruf dan angka (tidak boleh ada simbol)',
            'any.required': 'Password wajib diisi'
        }),

    role: Joi.string()
        .required()
        .messages({
            'any.required': 'Role wajib diisi'
        }),

    branch: Joi.string() 
        .required()
        .messages({
            'any.required': 'Branch wajib diisi'
        }),

    status: Joi.string()
        .valid('active', 'inactive', 'banned')
        .default('active')
        .messages({
            'any.only': 'Status tidak valid. Pilihan: active, inactive, banned'
        })
});

export const UpdateUserSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .trim()
        .optional()
        .messages({
            'string.min': 'Nama minimal harus 3 karakter',
            'string.max': 'Nama maksimal 50 karakter'
        }),

    username: Joi.string()
        .min(4)
        .max(20)
        .alphanum()
        .trim()
        .optional()
        .messages({
            'string.min': 'Username minimal harus 4 karakter',
            'string.max': 'Username maksimal 20 karakter',
            'string.alphanum': 'Username hanya boleh berisi huruf dan angka'
        }),

    email: Joi.string()
        .email()
        .lowercase()
        .optional()
        .messages({
            'string.email': 'Format email tidak valid'
        }),

    password: Joi.string()
        .min(6)
        .optional()
        .allow('', null) 
        .messages({
            'string.min': 'Password minimal harus 6 karakter'
        }),

    status: Joi.string()
        .valid('active', 'inactive', 'banned')
        .optional()
        .messages({
            'any.only': 'Status harus salah satu dari: active, inactive, atau banned'
        }),

    role: Joi.alternatives().try(Joi.string(), Joi.number()).optional(), 
    
    branch: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),

}).min(1); 

export const ChangePasswordSchema = Joi.object({
    oldPassword: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password lama tidak boleh kosong',
            'any.required': 'Password lama wajib diisi'
        }),

    newPassword: Joi.string()
        .min(8)
        .required()
        .invalid(Joi.ref('oldPassword')) 
        .messages({
            'string.min': 'Password baru minimal harus 8 karakter',
            'string.empty': 'Password baru tidak boleh kosong',
            'any.required': 'Password baru wajib diisi',
            'any.invalid': 'Password baru tidak boleh sama dengan password lama'
        }),

});