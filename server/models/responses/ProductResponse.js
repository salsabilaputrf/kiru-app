export function ProductResponse(product) {
    if (!product) return null;

    return {
        id: product.id,
        name: product.product_name,
        categories: Array.isArray(product.categories) 
            ? product.categories.map(cat => ({
                id: cat.id,
                name: cat.name
            })) 
            : [],
        units: Array.isArray(product.units)
            ? product.units.map(unit => ({
                id: unit.id,
                name: unit.unit_name,
                multiplier: parseFloat(unit.multiplier || 1), 
                isBase: unit.is_base_unit,
                price: {
                    purchase: parseFloat(unit.purchase_price || 0),
                    selling: parseFloat(unit.selling_price || 0)
                },
                createdAt: unit.created_at,
                updatedAt: unit.updated_at
            }))
            : [],
        stocks: Array.isArray(product.stocks)
            ? product.stocks.map(stock => ({
                id: stock.id,
                branchId: stock.branch_id,
                branchName: stock.branch ? stock.branch.name : "Unknown Branch",
                qty: parseFloat(stock.quantity || 0),
                updatedAt: stock.updated_at
            }))
            : [],
        createdAt: product.created_at,
        updatedAt: product.updated_at
    };
}

export function ProductListResponse(products, pagination) {
    return {
        products: Array.isArray(products) ? products.map(ProductResponse) : [],
        pagination: {
            total: pagination?.total || 0,
            page: pagination?.page || 1,
            limit: pagination?.limit || 10,
            totalPages: pagination?.totalPages || 0
        }
    };
}

export default {
    ProductResponse,
    ProductListResponse
};