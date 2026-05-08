import { EntitySchema } from 'typeorm';

export const Transaction = new EntitySchema({
    name: "Transaction",
    tableName: "transactions",
    columns: {
        id: {
            primary: true,
            type: "char",
            length: 36,
            generated: "uuid"
        },
        transaction_date: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        },
        branch_id: {
            type: "char",
            length: 36,
            nullable: false
        },
        user_id: {
            type: "char",
            length: 36,
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
        branch: {
            target: "Branch",
            type: "many-to-one",
            joinColumn: { name: "branch_id" }
        },
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: { name: "user_id" }
        },
        items: {
            target: "TransactionItem",
            type: "one-to-many",
            inverseSide: "transaction",
            cascade: true
        }
    }
});