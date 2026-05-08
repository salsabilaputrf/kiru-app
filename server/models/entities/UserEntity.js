import { EntitySchema } from 'typeorm';

export const User = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            primary: true,
            type: 'char',
            length: 36,
            generated: 'uuid',
        },
        name: {
            type: 'varchar',
            length: 150,
        },
        username: {
            type: 'varchar',
            length: 100,
            unique: true,
        },
        email: {
            type: 'varchar',
            length: 150,
            unique: true,
        },
        password: {
            type: 'varchar',
            length: 255,
            select: false,
        },
        status: {
            type: 'enum',
            enum: ['active', 'inactive', 'banned'],
            default: 'active',
        },
        lastLoginAt: {
            name: 'last_login_at',
            type: 'timestamp',
            nullable: true,
        },
        createdAt: {
            name: 'created_at',
            type: 'timestamp',
            createDate: true,
        },
        updatedAt: {
            name: 'updated_at',
            type: 'timestamp',
            updateDate: true,
        },
        role_id: {
            type: 'char',
            length: 36,
            nullable: true,
        },
        branch_id: {
            type: 'char',
            length: 36,
            nullable: false,
        },
    },
   
    relations: {
		role: {
			type: 'many-to-one',
			target: 'Role',
			joinColumn: { name: 'role_id' }, 
			onDelete: 'SET NULL',
			nullable: true,
    },
		branch: {
			type: 'many-to-one',
			target: 'Branch',
			joinColumn: { name: 'branch_id' }, 
			nullable: false, 
    },
},
});