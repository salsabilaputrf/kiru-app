import { useState } from 'react';
import { transactionService } from '@/services/transactionService';
import { message } from 'antd';

export function useTransaction() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function submitTransaction({ cashAmount, cart }) {
        setLoading(true);
        setError(null);

        try {
            const items = cart.map((item) => {
                return {
                    product_id: item.product_id,
                
                    product_unit_id: item.product_unit_id || item.unit_id, 
                    
                    multiplier: item.multiplier,
                    quantity: item.qty,
                    
                    unit_price: item.price,
                };
            });

            const response = await transactionService.createTransaction({
                cash_amount: cashAmount,
                items,
            });
            message.success(response.message)

            return response.data;

        } catch (err) {
            const message = err?.response?.data?.message || err.message || 'Transaksi gagal';
            setError(message);
            throw err; 
        } finally {
            setLoading(false);
        }
    }

    return { submitTransaction, loading, error };
}