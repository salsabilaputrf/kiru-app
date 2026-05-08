import React from 'react';
import {
    App as AntdApp,
    Card, Col, Row, Input, Select, Button, Tag, Table,
    Flex, Typography, Collapse, Pagination, Space, Tooltip,
    Spin, Popconfirm
} from 'antd';
import {
    SearchOutlined, PlusOutlined, EditOutlined, TagsOutlined,
    BoxPlotOutlined, EnvironmentOutlined, FilterOutlined, DeleteOutlined, QuestionCircleOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/layouts/MainLayout';
import { useProduct } from '@/hooks/useProduct';
import { useProfile } from '@/hooks/useProfile';
import {
    ModalProduct,
    ModalAddStock,
    ModalManageCategory,
} from '@/components/Modal';

const { Title, Text } = Typography;
const { Panel }       = Collapse;

export default function InventoryStock() {
    const {
        paginatedProducts,
        filteredProducts,
        categories,
        branches,
        filters,
        total,
        loading,
        isModalVisible,
        isStockVisible,
        isCategoryModalVisible,
        editingProduct,
        selectedProduct,
        setFilters,
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
        fetchCategories,
    } = useProduct();

    const { userData } = useProfile();
    const isOwner      = userData?.role === 'owner';
    const userBranch = !isOwner? { id: userData?.branchId, name: userData?.branch }: null;

    return (
        <MainLayout title="Inventory & Stok">
            <div className="flex flex-col gap-8">

                {/* HEADER */}
                <Flex justify="space-between" align="center" className="flex-wrap gap-4">
                    <Flex align="center" gap={12}>
                        <div className="p-3 bg-violet-100 text-violet-600 rounded-2xl shadow-sm">
                            <BoxPlotOutlined className="text-2xl" />
                        </div>
                        <Title level={3} className="!m-0 !font-black !tracking-tight">
                            Manajemen Inventaris & Stok
                        </Title>
                    </Flex>
                    <Space>
                        {isOwner && (
                            <Button
                                icon={<TagsOutlined />}
                                size="large"
                                onClick={openCategoryModal}
                                className="!rounded-xl !h-12 !px-6 font-bold border-violet-200 text-violet-600 hover:!bg-violet-50"
                            >
                                Kelola Kategori
                            </Button>
                        )}
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            onClick={openAddModal}
                            className="!bg-violet-600 hover:!bg-violet-700 !rounded-xl !h-12 !px-6 font-bold border-none shadow-lg"
                        >
                            Tambah Produk Baru
                        </Button>
                    </Space>
                </Flex>

                {/* FILTER */}
                <Card
                    className="!rounded-3xl border-none shadow-sm"
                    styles={{ body: { padding: '20px 24px' } }}
                >
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} md={14} lg={16}>
                            <Input
                                placeholder="Cari nama produk atau kategori..."
                                prefix={<SearchOutlined className="text-gray-400 mr-1" />}
                                className="!rounded-2xl !py-3 bg-gray-50 border-none"
                                value={filters.search}
                                onChange={(e) =>
                                    setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))
                                }
                                allowClear
                            />
                        </Col>
                        <Col xs={24} md={10} lg={8}>
                            <Flex gap={12}>
                                <Select
                                    value={filters.category}
                                    className="w-full !h-12"
                                    onChange={(val) =>
                                        setFilters((f) => ({ ...f, category: val, page: 1 }))
                                    }
                                    options={[
                                        { value: 'all', label: 'Semua Kategori' },
                                        ...categories.map((c) => ({ value: c.id, label: c.name })),
                                    ]}
                                />
                                <Tooltip title="Reset filter">
                                    <Button
                                        icon={<FilterOutlined />}
                                        onClick={() =>
                                            setFilters((f) => ({
                                                ...f,
                                                search:   '',
                                                category: 'all',
                                                page:     1,
                                            }))
                                        }
                                        className="!h-12 !w-12 !rounded-xl bg-gray-50 border-none flex-shrink-0"
                                    />
                                </Tooltip>
                            </Flex>
                        </Col>
                    </Row>
                </Card>

                {paginatedProducts.length > 0 ? (
                    <Spin spinning={loading}>
                        <Collapse
                        accordion
                        expandIconPlacement="end"
                        className="bg-transparent border-none"
                        >
                            {paginatedProducts.map((product) => {
                                const baseUnit  = product.units?.find((u) => u.isBase);
                                const myStock   = product.stocks?.find(
                                    (s) => s.branchName === userData?.branch
                                );
                                const firstCat  = product.categories?.[0]?.name ?? '-';

                                return (
                                    <Panel
                                        key={product.id}
                                        className="mb-4 bg-white !rounded-3xl border-none shadow-sm overflow-hidden"
                                        header={
                                            <Flex
                                                justify="space-between"
                                                align="center"
                                                className="w-full pr-4"
                                            >
                                                <Flex align="center" gap={12}>
                                                    <div>
                                                        <Text className="font-bold text-base block">
                                                            {product.name}
                                                        </Text>
                                                        <div className="flex flex-wrap gap-1">
                                                            {product.categories && product.categories.length > 0 ? (
                                                                product.categories.map((cat) => (
                                                                    <Tag
                                                                        key={cat.id}
                                                                        color="blue"
                                                                        className="rounded-full border-none px-3"
                                                                    >
                                                                        {cat.name}
                                                                    </Tag>
                                                                ))
                                                            ) : (
                                                                <Tag color="default" className="rounded-full border-none px-3">-</Tag>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Flex>

                                                {!isOwner && (
                                                    <div className="text-right mr-4">
                                                        <Text
                                                            type="secondary"
                                                            className="text-[10px] uppercase font-bold block"
                                                        >
                                                            Stok
                                                        </Text>
                                                        <Text className="font-black text-violet-600">
                                                            {myStock?.qty ?? 0} {baseUnit?.name ?? 'Pcs'}
                                                        </Text>
                                                    </div>
                                                )}
                                            </Flex>
                                        }
                                    >
                                        <div className="p-2 space-y-6">
                                            <div>
                                                <Text className="font-bold mb-3 block text-gray-500">
                                                    Satuan & Harga
                                                </Text>
                                                <Table
                                                    dataSource={product.units}
                                                    pagination={false}
                                                    size="small"
                                                    rowKey="id"
                                                    columns={[
                                                        {
                                                            title: 'Unit',
                                                            dataIndex: 'name',
                                                            render: (text, row) =>
                                                                row.isBase ? (
                                                                    <Text strong>
                                                                        {text}{' '}
                                                                        <Tag
                                                                            color="purple"
                                                                            className="!text-[10px]"
                                                                        >
                                                                            Base
                                                                        </Tag>
                                                                    </Text>
                                                                ) : (
                                                                    text
                                                                ),
                                                        },
                                                        {
                                                            title: 'Multiplier',
                                                            dataIndex: 'multiplier',
                                                            render: (val, row) =>
                                                                row.isBase ? '1 (Dasar)' : `x${val}`,
                                                        },
                                                        {
                                                            title: 'Harga Beli',
                                                            dataIndex: ['price', 'purchase'],
                                                            render: (val) =>
                                                                `Rp ${(val ?? 0).toLocaleString('id-ID')}`,
                                                        },
                                                        {
                                                            title: 'Harga Jual',
                                                            dataIndex: ['price', 'selling'],
                                                            render: (val) => (
                                                                <Text className="font-bold text-green-600">
                                                                    Rp {(val ?? 0).toLocaleString('id-ID')}
                                                                </Text>
                                                            ),
                                                        },
                                                    ]}
                                                />
                                            </div>

                                            <div>
                                                <Text className="font-bold mb-3 block text-gray-500">
                                                    Informasi Stok
                                                </Text>
                                                <Row gutter={[16, 16]}>
                                                    {isOwner ? (
                                                        product.stocks?.length > 0 ? (
                                                            product.stocks.map((stock) => (
                                                                <Col span={12} key={stock.id}>
                                                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                                        <Flex
                                                                            align="center"
                                                                            gap={8}
                                                                            className="mb-1 text-gray-400"
                                                                        >
                                                                            <EnvironmentOutlined />
                                                                            <Text className="text-xs font-bold uppercase tracking-wider">
                                                                                {stock.branchName}
                                                                            </Text>
                                                                        </Flex>
                                                                        <Text className="text-xl font-black">
                                                                            {stock.qty}{' '}
                                                                            <small className="text-gray-400 font-medium">
                                                                                {baseUnit?.name ?? 'Pcs'}
                                                                            </small>
                                                                        </Text>
                                                                    </div>
                                                                </Col>
                                                            ))
                                                        ) : (
                                                            <Col span={24}>
                                                                <Text type="secondary" className="text-sm">
                                                                    Belum ada stok di cabang manapun.
                                                                </Text>
                                                            </Col>
                                                        )
                                                    ) : (
                                                        <Col span={24}>
                                                            <div className="bg-violet-50 p-4 rounded-2xl border border-violet-100">
                                                                <Text className="text-xs font-bold text-violet-400 uppercase block mb-1">
                                                                    Stok di {userData?.branch}
                                                                </Text>
                                                                <Text className="text-2xl font-black text-violet-700">
                                                                    {myStock?.qty ?? 0}{' '}
                                                                    <small className="text-violet-300 font-medium">
                                                                        {baseUnit?.name ?? 'Pcs'}
                                                                    </small>
                                                                </Text>
                                                            </div>
                                                        </Col>
                                                    )}
                                                </Row>
                                            </div>

                                            <Flex gap={12} className="pt-4 border-t border-gray-100">
                                                <Button
                                                    block
                                                    icon={<EditOutlined />}
                                                    className="!rounded-xl font-bold"
                                                    onClick={() => openEditModal(product)}
                                                >
                                                    Edit Produk
                                                </Button>
                                                <Button
                                                    block
                                                    type="primary"
                                                    icon={<PlusOutlined />}
                                                    className="!rounded-xl font-bold !bg-violet-600 border-none"
                                                    onClick={() => openStockModal(product)}
                                                >
                                                    Tambah Stok
                                                </Button>
                                                {isOwner && (
                                                    <Tooltip title="Hapus Produk">
                                                        <Popconfirm
                                                            title="Hapus Produk"
                                                            description="Apakah Anda yakin ingin menghapus produk ini? Data stok terkait juga akan dihapus."
                                                            onConfirm={() => handleDeleteProduct(product.id)}
                                                            okText="Ya, Hapus"
                                                            cancelText="Batal"
                                                            okButtonProps={{ danger: true }}
                                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                        >
                                                            <Button
                                                                danger
                                                                icon={<DeleteOutlined />}
                                                                className="!rounded-xl"
                                                            />
                                                        </Popconfirm>
                                                    </Tooltip>
                                                )}
                                            </Flex>
                                        </div>
                                    </Panel>
                                );
                            })}
                        </Collapse>
                    </Spin>
                   
                ) : (
                    <Card className="!rounded-3xl border-none shadow-sm">
                        <Flex justify="center" className="py-16">
                            <Text type="secondary">
                                {filters.search || filters.category !== 'all'
                                    ? 'Tidak ada produk yang cocok dengan filter.'
                                    : 'Belum ada produk. Tambahkan produk pertama Anda!'}
                            </Text>
                        </Flex>
                    </Card>
                )}

                {total > 0 && (
                    <Flex justify="end">
                        <Pagination
                            current={filters.page}
                            pageSize={filters.limit}
                            total={total}
                            showSizeChanger
                            pageSizeOptions={['10', '20', '50']}
                            onChange={(page, limit) =>
                                setFilters((f) => ({ ...f, page, limit }))
                            }
                            showTotal={(t) => `${t} produk`}
                        />
                    </Flex>
                )}
            </div>

            <ModalProduct
                isVisible={isModalVisible}
                onCancel={closeModal}
                onSave={handleSaveProduct}
                loading={loading}
                initialData={editingProduct}
                categories={categories}
            />

            <ModalAddStock
                isVisible={isStockVisible}
                onCancel={closeStockModal}
                onSave={handleAddStock}
                loading={loading}
                product={selectedProduct}
                branches={branches}
                isOwner={isOwner}
                userBranch={userBranch}
            />

            <ModalManageCategory
                isVisible={isCategoryModalVisible}
                onCancel={closeCategoryModal}
                onCategoryChange={fetchCategories}
            />
        </MainLayout>
    );
}