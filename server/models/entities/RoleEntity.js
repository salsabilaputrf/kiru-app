import { EntitySchema } from 'typeorm';

export const Role = new EntitySchema({
    name: 'Role',
    tableName: 'roles',
    columns: {
        id: {
            primary: true,
            type: 'char',
            length: 36,
            generated: 'uuid',
        },
        role_name: {
            type: 'varchar',
            length: 50,
            unique: true,
        },
        rules: {
            type: 'text',
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
    },
    relations: {
        users: {
            type: 'one-to-many',
            target: 'User',
            inverseSide: 'role',
        },
    },
});