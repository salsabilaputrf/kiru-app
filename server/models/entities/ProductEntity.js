import { EntitySchema } from 'typeorm';

export const Product = new EntitySchema({
    name: "Product",
    tableName: "products",
    columns: {
        id: { 
            primary: true, 
            type: "uuid", 
            generated: "uuid" 
        },
        product_name: { 
            type: "varchar", 
            length: 200, 
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
        categories: {
            target: "Category", 
            type: "many-to-many",
            inverseSide: "products",
            joinTable: {
                name: "product_category_rel",
                joinColumn: { 
                    name: "product_id", 
                    referencedColumnName: "id" 
                },
                inverseJoinColumn: { 
                    name: "category_id",
                    referencedColumnName: "id" 
                }
            }
        },
        units: {
            target: "ProductUnit",
            type: "one-to-many",
            inverseSide: "product"
        },
        stocks: {
            target: "Stock",
            type: "one-to-many",
            inverseSide: "product" 
        }
    }
});