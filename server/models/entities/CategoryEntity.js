import { EntitySchema } from 'typeorm';

export const Category = new EntitySchema({
    name: "Category",
    tableName: "categories",
    columns: {
        id: { 
            primary: true, 
            type: "uuid", 
            generated: "uuid" 
        },
        name: { 
            type: "varchar", 
            length: 100, 
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
        products: {
            type: "many-to-many",
            target: "Product",
            mappedBy: "categories",
        }
    }
});