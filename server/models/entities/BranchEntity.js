import { EntitySchema } from 'typeorm';

export const Branch = new EntitySchema({
    name: 'Branch',
    tableName: 'branches',
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
        location: {
            type: 'varchar',
            length: 255,
        },
        isActive: {
            name: 'is_active',
            type: 'boolean',
            default: true,
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
    },
    relations: {
        users: {
            type: 'one-to-many',
            target: 'User',
            inverseSide: 'branch',
        },
        stocks: {
            target: "Stock",
            type: "one-to-many",
            inverseSide: "branch" 
        }
    },
});