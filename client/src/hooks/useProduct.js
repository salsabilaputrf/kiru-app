import { useState, useEffect, useMemo, useCallback } from 'react';
import { App as AntdApp } from 'antd';
import { productService } from '../services/productService';

export const useProduct = () => {
    const { message } = AntdApp.useApp();
    const [filters, setFilters] = useState({
        search:   '',
        category: 'all',
        page:     1,
        limit:    10,
    });
    const [products,   setProducts]   = useState([]);
    const [categories, setCategories] = useState([]);
    const [branches,   setBranches]   = useState([]);
    const [loading,    setLoading]    = useState(false);

    const [isModalVisible,         setIsModalVisible]         = useState(false);
    const [isStockVisible,         setIsStockVisible]         = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

    const [editingProduct,  setEditingProduct]  = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const result = await productService.getAllProducts();

            setProducts(result.data?.products ?? []);
        } catch (error) {
            console.error('Gagal mengambil produk:', error);
            message.error('Gagal memuat data produk');
        } finally {
            setLoading(false);
        }
    }, [message]);

    const fetchCategories = useCallback(async () => {
        try {
            const result = await productService.getCategories();
            setCategories(result.data?.categories ?? []);
        } catch (error) {
            console.error('Gagal mengambil kategori:', error);
            message.error('Gagal memuat kategori');
        }
    }, [message]);

    const fetchBranches = useCallback(async () => {
        try {
            const result = await productService.getBranches();
            setBranches(result.data?.branches ?? []);
        } catch (error) {
            console.error('Gagal mengambil cabang:', error);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchBranches();
    }, [fetchProducts, fetchCategories, fetchBranches]);

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const search = filters.search.toLowerCase().trim();

            const matchesSearch =
                !search ||
                p.name.toLowerCase().includes(search) ||
                p.categories?.some((c) => c.name?.toLowerCase().includes(search));

            const matchesCategory =
                filters.category === 'all' ||
                p.categories?.some((c) => c.id === filters.category);

            return matchesSearch && matchesCategory;
        });
    }, [products, filters.search, filters.category]);

    const paginatedProducts = useMemo(() => {
        const offset = (filters.page - 1) * filters.limit;
        return filteredProducts.slice(offset, offset + filters.limit);
    }, [filteredProducts, filters.page, filters.limit]);

    const total = filteredProducts.length;

    const openAddModal = useCallback(() => {
        setEditingProduct(null);
        setIsModalVisible(true);
    }, []);

    const openEditModal = useCallback((product) => {
        setEditingProduct({
            ...product,
            units: product.units.map((u) => ({
                id:             u.id,
                unit_name:      u.name,
                multiplier:     u.multiplier,
                is_base_unit:   u.isBase,
                purchase_price: u.price?.purchase ?? 0,
                selling_price:  u.price?.selling  ?? 0,
            })),
        });
        setIsModalVisible(true);
    }, []);

    const openStockModal = useCallback((product) => {
        setSelectedProduct(product);
        setIsStockVisible(true);
    }, []);

    const openCategoryModal = useCallback(() => {
        setIsCategoryModalVisible(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalVisible(false);
        setEditingProduct(null);
    }, []);

    const closeStockModal = useCallback(() => {
        setIsStockVisible(false);
        setSelectedProduct(null);
    }, []);

    const closeCategoryModal = useCallback(() => {
        setIsCategoryModalVisible(false);
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({ search: '', category: 'all', page: 1, limit: 10 });
    }, []);

    const handleSaveProduct = useCallback(async (values) => {
        setLoading(true);
        try {
            const payload = {
                name:       values.name,
                categories: values.categories,
                units:      values.units,
            };

            if (editingProduct) {
                await productService.updateProduct(editingProduct.id, payload);
                message.success('Produk berhasil diperbarui');
            } else {
                await productService.createProduct(payload);
                message.success('Produk baru berhasil ditambahkan');
            }

            closeModal();
            await fetchProducts();
        } catch (error) {
            console.error('Gagal menyimpan produk:', error);
            const errMsg = error.response?.data?.message || 'Gagal menyimpan produk';
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    }, [editingProduct, message, closeModal, fetchProducts]);

    const handleDeleteProduct = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await productService.deleteProduct(id);
            message.success(response.message);
            setFilters((prev) => ({ ...prev, page: 1 }));
            await fetchProducts();
        } catch (error) {
            console.error('Gagal menghapus produk:', error);
            const errMsg = error.response?.data?.message || 'Gagal menghapus produk';
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    }, [message, fetchProducts]);

    const handleAddStock = useCallback(async (payload) => {
        setLoading(true);
        try {
            const response = await productService.addStock(payload);
 
            message.success(response.message);
            closeStockModal();
            await fetchProducts();
        } catch (error) {
            console.error('Gagal menambah stok:', error);
            const errMsg = error.response?.data?.message || 'Gagal menambah stok';
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    }, [message, closeStockModal, fetchProducts]);

    return {
        products,
        filteredProducts,
        paginatedProducts,
        categories,
        branches,
        total,
        loading,
        filters,
        setFilters,
        resetFilters,
        isModalVisible,
        isStockVisible,
        isCategoryModalVisible,
        editingProduct,
        selectedProduct,
        setIsModalVisible,
        setIsStockVisible,
        setIsCategoryModalVisible,
        openAddModal,
        openEditModal,
        openStockModal,
        openCategoryModal,
        closeModal,
        closeStockModal,
        closeCategoryModal,
        handleSaveProduct,
        handleDeleteProduct,
        handleAddStock,
        fetchProducts,
        fetchCategories,
    };
};