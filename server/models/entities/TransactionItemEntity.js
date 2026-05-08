import { EntitySchema } from 'typeorm';

export const TransactionItem = new EntitySchema({
    name: "TransactionItem",
    tableName: "transaction_items",
    columns: {
        id: {
            primary: true,
            type: "char",
            length: 36,
            generated: "uuid"
        },
        transaction_id: {
            type: "char",
            length: 36,
            nullable: false
        },
        product_id: {
            type: "char",
            length: 36,
            nullable: false
        },
        product_unit_id: {
            type: "char",
            length: 36,
            nullable: false
        },
        quantity: {
            type: "decimal",
            precision: 15,
            scale: 2,
            nullable: false
        },
        unit_price: {
            type: "decimal",
            precision: 15,
            scale: 2,
            nullable: false
        },
        created_at: {
            type: "timestamp",
            createDate: true
        },
        updated_at: {
            type: "timestamp",
            updateDate: true
        }
    },
    relations: {
        transaction: {
            target: "Transaction",
            type: "many-to-one",
            inverseSide: "items",
            joinColumn: { name: "transaction_id" },
            onDelete: "CASCADE" 
        },
        product: {
            target: "Product",
            type: "many-to-one",
            joinColumn: { name: "product_id" }
        },
        unit: {
            target: "ProductUnit",
            type: "many-to-one",
            joinColumn: { name: "product_unit_id" }
        }
    }
});