import { EntitySchema } from 'typeorm';

export const Stock = new EntitySchema({
    name: "Stock",
    tableName: "stocks",
    columns: {
        id: { 
            primary: true, 
            type: "uuid", 
            generated: "uuid" 
        },
        branch_id: { 
            type: "uuid", 
            nullable: false 
        },
        product_id: { 
            type: "uuid", 
            nullable: false 
        },
        quantity: { 
            type: "decimal", 
            precision: 15, 
            scale: 2, 
            default: 0 
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
    indices: [
        {
            name: "IDX_STOCK_BRANCH_PRODUCT",
            unique: true,
            columns: ["branch_id", "product_id"]
        }
    ],
    relations: {
        branch: {
            target: "Branch", 
            type: "many-to-one",
            joinColumn: {
                name: "branch_id" 
            },
            onDelete: "RESTRICT",
            inverseSide: "stocks"
        },
        product: {
            target: "Product", 
            type: "many-to-one",
            joinColumn: { 
                name: "product_id" 
            },
            onDelete: "RESTRICT",
            inverseSide: "stocks"
        }
    }
});