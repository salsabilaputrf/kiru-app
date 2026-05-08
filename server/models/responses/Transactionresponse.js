// ── Helper ───────────────────────────────────────────────────────────────────
const toRupiah = (value) => `Rp ${Number(value).toLocaleString('id-ID')}`;

const itemSubtotal = (item) => Number(item.quantity) * Number(item.unit_price);

const formatItem = (item) => {
    const subtotal = itemSubtotal(item);
    return {
        id:              item.id,
        transaction_id:  item.transaction_id,
        product_id:      item.product_id,
        product_name:    item.product?.product_name ?? null,
        product_unit_id: item.product_unit_id,
        unit_name:       item.product_unit?.unit_name ?? null,
        quantity:        Number(item.quantity),
        unit_price:      Number(item.unit_price),
        unit_price_label: toRupiah(item.unit_price),
        subtotal,
        subtotal_label:  toRupiah(subtotal),
    };
};

export const TransactionDetailResponse = (trx, cashAmount = null) => {
    const items    = (trx.items ?? []).map(formatItem);
    const subtotal = items.reduce((acc, i) => acc + i.subtotal, 0);
    const change   = cashAmount !== null ? cashAmount - subtotal : null;

    return {
        id:               trx.id,
        branch_id:        trx.branch_id,
        branch_name:      trx.branch?.name ?? null,
        branch_address:   trx.branch?.location ?? null,
        user_id:          trx.user_id,
        cashier_name:     trx.user?.name ?? null,
        transaction_date: trx.transaction_date,
        created_at:       trx.created_at,
        subtotal,
        subtotal_label:   toRupiah(subtotal),
        ...(cashAmount !== null && {
            cash_amount:   cashAmount,
            cash_label:    toRupiah(cashAmount),
            change_amount: change,
            change_label:  toRupiah(change),
        }),
        items,
    };
};

export const TransactionListResponse = (rows, pagination) =>
    rows.map((trx) => {
        const subtotal = (trx.items ?? []).reduce(
            (acc, i) => acc + Number(i.quantity) * Number(i.unit_price),
            0
        );
        return {
            id:               trx.id,
            branch_id:        trx.branch_id,
            branch_name:      trx.branch?.name ?? null,
            user_id:          trx.user_id,
            cashier_name:     trx.user?.name ?? null,
            transaction_date: trx.transaction_date,
            subtotal,
            subtotal_label:   toRupiah(subtotal),
            total_items:      trx.items?.length ?? 0,
        };
    }).concat([{ pagination }]); 