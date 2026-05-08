import React, { useState, useMemo, useCallback } from 'react';
import { 
    Row, Col, Card, Input, Button, Flex, Typography,
    Divider, InputNumber, Tag, Empty, message
} from 'antd';
import {
    SearchOutlined, DeleteOutlined, WalletOutlined
} from '@ant-design/icons';
import MainLayout     from '@/components/layouts/MainLayout';
import { useProfile }     from '@/hooks/useProfile';
import { useTransaction } from '@/hooks/useTransaction';
import ReceiptModal from '@/components/Modal';
import { useProduct } from '@/hooks/useProduct';


const { Title, Text } = Typography;

export default function PointOfSale() {
    const now  = new Date();
    const { products, loading: productsLoading } = useProduct(); 
    const [cart, setCart] = useState([]);
    const [cashAmount, setCashAmount] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [receiptOpen, setReceiptOpen] = useState(false);
    const [lastTransaction, setLastTransaction] = useState(null);
  
    const { userData }                   = useProfile();
    const { submitTransaction, loading } = useTransaction();

    const filteredProducts = useMemo(() => {
        if (!products) return [];
  
        return products.filter(p => {
            const search = searchText.toLowerCase();

            const matchesName = p.name?.toLowerCase().includes(search);

            const matchesCategory = p.categories?.some(c => c.name?.toLowerCase().includes(search));
            
            return matchesName || matchesCategory ;
        });
    }, [products, searchText]);
    
    const storeInfo = {
        name:          import.meta.env.VITE_STORE_NAME,
        branch:        userData?.branch        ?? '—',
        branchAddress: userData?.branchLocation ?? '',
        cashier:       userData?.name          ?? '—',
        fullDateTime: `${now.toLocaleDateString('id-ID', {
            day: '2-digit', month: '2-digit', year: '2-digit',
        })}, ${now.toLocaleTimeString('id-ID', {
            hour: '2-digit', minute: '2-digit',
        }).replace(':', '.')}`,
    };

    const updateQty = (cartKey, delta) => {
        setCart(prev => prev.map(item => {
            if (item.cartKey !== cartKey) return item;
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : item;
        }));
    };

    const addToCart = (product, unit) => {
        const branchStock = product.stocks?.find(
            (s) => s.branchId === userData?.branch_id || s.branchName === userData?.branch
        );
        const totalStock = branchStock?.qty || 0;

        const cartKey = `${product.id}-${unit.id}`;
        const existing = cart.find(item => item.cartKey === cartKey);

        const currentCartQty = existing ? existing.qty : 0;
        const requiredStock = (currentCartQty + 1) * unit.multiplier;

        if (totalStock < requiredStock) {
            message.warning(`Stok tidak mencukupi. Sisa stok di cabang: ${totalStock} (kebutuhan: ${requiredStock})`);
            return;
        }

        if (existing) {
            updateQty(cartKey, 1);
        } else {
            setCart([...cart, {
                cartKey,
                product_id: product.id,
                product_unit_id: unit.id, 
                name: product.name,
                unit_name: unit.name,
                multiplier: unit.multiplier, 
                price: unit.price?.selling ?? 0,
                qty: 1,
            }]);
        }
    };

    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.qty, 0), [cart]);
    const change = useMemo(() => cashAmount - subtotal, [cashAmount, subtotal]);

    const handleConfirm = async () => {
        try {
            const result = await submitTransaction({ cashAmount, cart });
            console.log(result)
            setLastTransaction(result);
            setReceiptOpen(true);
        } catch (err) {
            console.log(err.response.data)
            message.error(err?.response?.data?.message || 'Transaksi gagal, coba lagi');
        }
    };

    const handleCashChange = useCallback((val) => {
        setCashAmount(val || 0);
    }, []);

    const handleReceiptClose = () => {
        setReceiptOpen(false);
        setLastTransaction(null);
        setCart([]);
        setCashAmount(0);
    };

    return (
        <MainLayout title="Point of sale">
            <div className="h-[calc(100vh-80px)] overflow-hidden bg-[#F8FAFC]">
                <Row className="h-full" style={{ flexWrap: 'nowrap' }}>
                    <Col
                        flex="1 1 0"
                        className="h-full overflow-y-auto custom-scrollbar"
                        style={{ padding: '28px', minWidth: 0 }}
                    >
                        <div className="pos-header mb-6">
                            <Title level={4} className="!m-0 !font-black !tracking-tight text-slate-800 pos-header-title">
                                Klik pada satuan unit untuk menambah pesanan
                            </Title>
                            <Input
                                prefix={<SearchOutlined className="text-slate-300" />}
                                placeholder="Cari produk..."
                                className="!h-12 !rounded-2xl border-none shadow-sm font-medium pos-header-search"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                            />
                        </div>

                        <div className="product-grid">
                            {productsLoading ? (
                                <div className="col-span-full py-10 text-center">Memuat produk...</div>
                            ) : (
                                filteredProducts.map(product => (
                                    
                                    <Card
                                        key={product.id}
                                        className={`product-card !rounded-[24px] border-none shadow-sm hover:shadow-md transition-all overflow-hidden ${
                                            (product.stocks?.reduce((acc, s) => acc + s.qty, 0) || 0) === 0 ? 'opacity-60' : ''
                                        }`}
                                    >
                                        <Flex justify="space-between" align="start" className="mb-3" style={{ minHeight: 26 }}>
                                            <Tag className="!border-none !bg-indigo-50 !text-indigo-600 font-bold !rounded-lg px-2 !m-0">
                                                {product.categories?.[0]?.name || 'Tanpa Kategori'}
                                            </Tag>

                                            {(() => {
                                               const branchStockEntry = product.stocks?.find(
                                                    (s) => s.branchId === userData?.branch_id || s.branchName === userData?.branch
                                               )
                                            
                                                const totalStock = branchStockEntry?.qty || 0;
                                              
                                                if (totalStock <= 5 && totalStock > 0) {
                                                    return <Tag color="orange" className="!rounded-lg border-none font-bold !m-0">Sisa {totalStock}</Tag>;
                                                }
                                                if (totalStock === 0) {
                                                    return <Tag color="red" className="!rounded-lg border-none font-bold !m-0">Habis</Tag>;
                                                }
                                                return null;
                                            })()}
                                        </Flex>

                                        <div style={{ minHeight: 52, marginBottom: 0 }}>
                                            <Title level={5} className="!m-0 !font-black !text-slate-700 product-name">
                                                {product.name}
                                            </Title>
                                        </div>

                                        <Divider className="!my-4 border-slate-100" />

                                        <Flex vertical gap={6}>
                                            {product.units?.map(unit => (
                                                <Button
                                                    key={unit.id}
                                                    block
                                                    disabled={(product.stocks?.reduce((acc, s) => acc + s.qty, 0) || 0) === 0}
                                                    className="!h-11 !rounded-xl border-slate-100 hover:!border-indigo-400 hover:!bg-indigo-50 group transition-all"
                                                    onClick={() => addToCart(product, unit)}
                                                >
                                                    <Flex justify="space-between" align="center" className="w-full" style={{ gap: 8 }}>
                                                        <Text strong className="text-slate-500 group-hover:text-indigo-600" style={{ flexShrink: 0 }}>
                                                            {unit.name}
                                                        </Text>
                                                        <Text className="text-slate-800 font-black" style={{ whiteSpace: 'nowrap' }}>
                                                            Rp {unit.price?.selling?.toLocaleString('id-ID') || '0'}
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            ))}
                                        </Flex>
                                    </Card>
                                ))
                            )}
                            

                            {filteredProducts.length === 0 && (
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <Empty description="Produk tidak ditemukan" className="mt-10" />
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col
                        flex="0 0 360px"
                        className="h-full bg-white border-l border-slate-200 shadow-sm"
                        style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}
                    >
                        <div className="p-6 border-b border-slate-100 bg-slate-50" style={{ flexShrink: 0 }}>
                            <Flex vertical align="center" className="mb-4">
                                <Title level={3} className="!m-0 !font-black !tracking-tighter text-slate-800">{storeInfo.name}</Title>
                                <Text className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">{storeInfo.branchAddress}</Text>
                            </Flex>
                            <div className="space-y-1">
                                <Flex justify="space-between" className="text-[11px] font-mono text-slate-500">
                                    <Text>KASIR:</Text>
                                    <Text className="font-bold text-slate-700 uppercase">{storeInfo.cashier}</Text>
                                </Flex>
                                <Flex justify="space-between" className="text-[11px] font-mono text-slate-500">
                                    <Text>Tgl:</Text>
                                    <Text>{storeInfo.fullDateTime}</Text>
                                </Flex>
                            </div>
                        </div>

                        <div className="custom-scrollbar bg-white" style={{ flex: '1 1 0', overflowY: 'auto', padding: '16px 24px' }}>
                            {cart.length === 0 ? (
                                <Empty description="Belum ada item" className="mt-10" />
                            ) : (
                                <div className="space-y-4">
                                    {cart.map(item => (
                                        <div key={item.cartKey} className="border-b border-slate-50 pb-3">
                                            <Flex justify="space-between" align="start">
                                                <div style={{ flex: 1, minWidth: 0, marginRight: 8 }}>
                                                    <Text className="font-bold text-slate-800 block leading-tight" style={{ wordBreak: 'break-word' }}>
                                                        {item.name}
                                                    </Text>
                                                    <Text className="text-[11px] text-slate-500 font-mono">
                                                        {item.qty} {item.unit_name} × {item.price.toLocaleString('id-ID')}
                                                    </Text>
                                                </div>
                                                <Flex align="center" gap={8} style={{ flexShrink: 0 }}>
                                                    <Text className="font-black text-slate-900" style={{ whiteSpace: 'nowrap' }}>
                                                        {(item.qty * item.price).toLocaleString('id-ID')}
                                                    </Text>
                                                    <Button
                                                        type="text" size="small" danger
                                                        icon={<DeleteOutlined style={{ fontSize: 12 }} />}
                                                        onClick={() => setCart(cart.filter(c => c.cartKey !== item.cartKey))}
                                                    />
                                                </Flex>
                                            </Flex>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ padding: '0 24px', flexShrink: 0 }}>
                            <div className="border-t-2 border-dashed border-slate-200 w-full my-2" />
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-200" style={{ flexShrink: 0 }}>
                            <Flex vertical gap={16}>
                                <Flex justify="space-between" align="center">
                                    <Text className="text-slate-800 font-black text-lg uppercase tracking-tight">Total</Text>
                                    <Title level={3} className="!m-0 !font-black !text-indigo-600">
                                        Rp {subtotal.toLocaleString('id-ID')}
                                    </Title>
                                </Flex>

                                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-inner text-center">
                                    <Text className="text-slate-400 text-[10px] block mb-1 font-black uppercase tracking-widest">
                                        Input Pembayaran Tunai
                                    </Text>
                                    <InputNumber
                                        className="!w-full !bg-transparent !border-none !text-slate-900 font-black classic-input-number"
                                        prefix={<WalletOutlined className="text-slate-400" />}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={val => setCashAmount(val || 0)}
                                        value={cashAmount}
                                        placeholder="0"
                                        controls={false}
                                    />
                                </div>

                                <Flex justify="space-between" className="px-3 py-2 bg-slate-100 rounded-lg">
                                    <Text className="text-slate-500 font-bold text-xs uppercase">Kembalian</Text>
                                    <Text className={`font-black ${change < 0 ? 'text-red-500' : 'text-green-600'}`}>
                                        Rp {(change < 0 ? 0 : change).toLocaleString('id-ID')}
                                    </Text>
                                </Flex>

                                <Button
                                    type="primary"
                                    block
                                    loading={loading}
                                    disabled={subtotal === 0 || cashAmount < subtotal}
                                    className="!h-14 !rounded-xl !bg-slate-900 hover:!bg-slate-800 border-none font-black text-base shadow-lg shadow-slate-200 uppercase tracking-widest"
                                    onClick={handleConfirm}
                                >
                                    Konfirmasi & Cetak Struk
                                </Button>

                                <Text className="text-center text-[10px] text-slate-400 italic font-medium">
                                    "Terima kasih telah berbelanja!"
                                </Text>
                            </Flex>
                        </div>
                    </Col>
                </Row>
            </div>

            <ReceiptModal
                isVisible={receiptOpen}
                onClose={handleReceiptClose}
                transaction={lastTransaction}
                storeName={storeInfo.name}
            />

            <style>{`
                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 16px;
                    align-items: start;
                }
                .product-card .ant-card-body {
                    display: flex !important;
                    flex-direction: column !important;
                    height: 100% !important;
                    padding: 16px !important;
                }
                .product-name {
                    display: -webkit-box !important;
                    -webkit-line-clamp: 2 !important;
                    -webkit-box-orient: vertical !important;
                    overflow: hidden !important;
                    line-height: 1.4 !important;
                }
                .classic-input-number .ant-input-number-input {
                    color: #1e293b !important;
                    height: 40px !important;
                    font-size: 24px !important;
                    text-align: center !important;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            `}</style>
        </MainLayout>
    );
}