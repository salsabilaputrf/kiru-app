import { EntitySchema } from 'typeorm';

export const ProductUnit = new EntitySchema({
    name: "ProductUnit",
    tableName: "product_units",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid",
        },
        product_id: {
            type: "uuid",
            nullable: false,
        },
        unit_name: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        multiplier: {
            type: "decimal",
            precision: 10,
            scale: 4,
            default: 1.0000,
            nullable: false,
        },
        is_base_unit: {
            type: "boolean",
            default: false,
            nullable: false,
        },
        purchase_price: {
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
            nullable: false,
        },
        selling_price: {
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
            nullable: false,
        },
        created_at: {
            type: "timestamp",
            createDate: true,
        },
        updated_at: {
            type: "timestamp",
            updateDate: true,
        },
    },
    relations: {
        product: {
            target: "Product", 
            type: "many-to-one",
            joinColumn: { name: "product_id" },
            onDelete: "CASCADE",
        },
        
    },
});