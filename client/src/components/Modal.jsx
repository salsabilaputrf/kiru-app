import React, { useState, useEffect, useMemo, useRef  } from 'react';
import { 
    App as AntdApp, Modal, Form, Input, Select, Button, Row, Col, 
    Typography, InputNumber, Divider, Space, 
     Switch, Flex, Avatar, Tag, Popconfirm, Spin, Empty
} from 'antd';
import { 
    PlusOutlined, 
    InfoCircleOutlined,
    TagsOutlined,
    DeleteOutlined,
    SearchOutlined,
    EditOutlined,
    UserOutlined,
    MailOutlined,
    LockOutlined,
    EnvironmentOutlined,
    SafetyCertificateOutlined,
    CheckCircleOutlined,
    IdcardOutlined,
    ArrowLeftOutlined,
    KeyOutlined,
    BankOutlined,
    CalendarOutlined,
    SaveOutlined,
    CheckOutlined,
    CloseOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { useUserForm } from '@/hooks/useUserForm';
import { productService } from '@/services/productService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const { Title, Text } = Typography;

export function ModalProfile({ isVisible, onCancel }) {
    const {
        userData,
        isChangingPassword,
        setIsChangingPassword,
        form,
        loading,
        handlePasswordSubmit,
        resetModal
    } = useProfile(onCancel);

    if (!userData) return null;

    return (
        <Modal
            open={isVisible}
            onCancel={resetModal}
            footer={null}
            closable={false}
            width={750}
            centered
            styles={{
                body: { padding: 0 },
                mask: { backdropFilter: 'blur(10px)', backgroundColor: 'rgba(15, 23, 42, 0.3)' }
            }}
            zIndex={2000}
            className="profile-modal"
        >
            <div className="overflow-hidden rounded-3xl">
                {/* Header */}
                <div className="h-32 bg-gradient-to-r from-violet-600 to-indigo-600 relative">
                    <Button 
                        icon={<ArrowLeftOutlined />} 
                        className="absolute top-4 left-4 !bg-white/20 !text-white border-none backdrop-blur-md hover:!bg-white/40"
                        onClick={resetModal}
                        shape="circle"
                    />
                </div>

                <div className="px-8 pb-10">
                    {/* Profile */}
                    <div className="flex items-end -mt-12 mb-8 gap-6">
                        <Avatar 
                            size={120}
                            icon={<UserOutlined />}
                            className="border-4 border-white shadow-2xl bg-violet-100 text-violet-600"
                        />
                        <div className="mb-2">
                            <Title level={3} className="!m-0 !font-black !tracking-tight">
                                {userData.name}
                            </Title>
                            <Text className="text-gray-400 font-medium">
                                {userData.username}
                            </Text>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {!isChangingPassword ? (
                            // Tampilan ketika awal profile info
                            <motion.div
                                key="info"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <Divider className="my-6" />
                                <div className="flex justify-between items-center mb-6">
                                    <Title level={5} className="!font-black !tracking-widest !uppercase !text-gray-400 !m-0">
                                        Detail Akun
                                    </Title>
                                    <Button 
                                        type="text" 
                                        icon={<KeyOutlined />} 
                                        className="text-violet-600 font-bold hover:bg-violet-50"
                                        onClick={() => setIsChangingPassword(true)}
                                    >
                                        Ganti Password
                                    </Button>
                                </div>

                                <Row gutter={[24, 24]}>
                                    <Col span={12}>
                                        <Space orientation="vertical" size={0}>
                                            <Text className="text-violet-500 font-bold uppercase text-[10px] tracking-widest block mb-1">
                                                <MailOutlined /> Email Utama
                                            </Text>
                                            <Text className="text-base font-semibold text-gray-800">{userData.email}</Text>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space orientation="vertical" size={0}>
                                            <Text className="text-violet-500 font-bold uppercase text-[10px] tracking-widest block mb-1">
                                                <SafetyCertificateOutlined /> Hak Akses
                                            </Text>
                                            <Tag color="purple" className="!rounded-full px-3 font-black border-none shadow-sm">{userData.role}</Tag>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space orientation="vertical" size={0}>
                                            <Text className="text-violet-500 font-bold uppercase text-[10px] tracking-widest block mb-1">
                                                <BankOutlined /> Cabang
                                            </Text>
                                            <Text className="text-base font-semibold text-gray-800">{userData.branch}</Text>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space orientation="vertical" size={0}>
                                            <Text className="text-violet-500 font-bold uppercase text-[10px] tracking-widest block mb-1">
                                                <CalendarOutlined /> Bergabung
                                            </Text>
                                            <Text className="text-base font-semibold text-gray-800">
                                                {userData.joinDate ? new Date(userData.joinDate).toLocaleDateString('id-ID', { 
                                                    day: 'numeric', 
                                                    month: 'long', 
                                                    year: 'numeric' 
                                                }) 
                                                : '-'}
                                            </Text>
                                        </Space>
                                    </Col>
                                </Row>
                            </motion.div>
                        ) : (
                            // Tampilan ketika klik ganti password, akan memunculkan form untuk change password
                            <motion.div
                                key="password"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="mt-6"
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => setIsChangingPassword(false)} />
                                    <Title level={4} className="!m-0 !font-black">Update Password</Title>
                                </div>

                                <Form form={form} layout="vertical" requiredMark={false}>
                                    <Form.Item 
                                        label={<Text strong className="text-gray-600">Password Lama</Text>}
                                        name="oldPassword"
                                        rules={[{ required: true, message: 'Wajib diisi' }]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} className="!h-12 !rounded-xl bg-gray-50" placeholder="Masukkan password saat ini" />
                                    </Form.Item>

                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item 
                                                label={<Text strong className="text-gray-600">Password Baru</Text>}
                                                name="newPassword"
                                                rules={[{ required: true, min: 8, message: 'Min. 8 karakter' }]}
                                            >
                                                <Input.Password prefix={<KeyOutlined />} className="!h-12 !rounded-xl bg-gray-50" placeholder="Password baru" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item 
                                                label={<Text strong className="text-gray-600">Konfirmasi Password</Text>}
                                                name="confirmPassword"
                                                dependencies={['newPassword']}
                                                rules={[
                                                    { required: true, message: 'Wajib konfirmasi' },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                                                            return Promise.reject(new Error('Password tidak cocok!'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password prefix={<CheckCircleOutlined />} className="!h-12 !rounded-xl bg-gray-50" placeholder="Ulangi password" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Button 
                                        type="primary" 
                                        block 
                                        loading={loading}
                                        icon={<SaveOutlined />}
                                        className="!h-14 !rounded-2xl !bg-violet-600 hover:!bg-violet-700 font-bold text-lg shadow-lg shadow-violet-200 mt-4 border-none"
                                        onClick={handlePasswordSubmit}
                                    >
                                        SIMPAN PASSWORD BARU
                                    </Button>
                                </Form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Modal>
    );
}

export function ModalUser({ isVisible, onCancel, onSave, initialData }) {
    const { 
        form, 
        roles, 
        branches, 
        loading, 
        handleSave 
    } = useUserForm(isVisible, initialData, onSave);

    return (
        <Modal
            title={null}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            closable={false}
            centered
            width="90%" 
            style={{ maxWidth: '700px' }}
            styles={{
                body: { 
                    padding: '40px' 
                },
                mask: { 
                    backdropFilter: 'blur(10px)', 
                    backgroundColor: 'rgba(15, 23, 42, 0.3)',
                    closable: false
                }
            }}
            zIndex={2000}
            className="modern-modal"
        >
            <div className="mb-8">
                <Title level={2} className="!m-0 !font-black !tracking-tight text-slate-800">
                     {initialData ? 'Edit User' : 'Tambah User'}
                </Title>
                <Text className="text-slate-500">
                    Sistem manajemen user Kiru App — Pastikan data sesuai dengan role dan branch.
                </Text>
            </div>


            <Spin spinning={loading}>
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark={false}
                    autoComplete="off"
                    className="modern-form"
                >
                    <Row gutter={24}>
                        {/* nama */}
                        <Col span={12}>
                            <Form.Item
                                label={<Text strong className="text-slate-600">Nama Lengkap</Text>}
                                name="name"
                                rules={[{ required: true, message: 'Nama wajib diisi' }]}
                            >
                                <Input 
                                    prefix={<UserOutlined className="text-slate-400" />} 
                                    placeholder="Salsabila Putri" 
                                    className="!h-12 !rounded-xl"
                                />
                            </Form.Item>
                        </Col>
                        {/* username */}
                        <Col span={12}>
                            <Form.Item
                                label={<Text strong className="text-slate-600">Username</Text>}
                                name="username"
                                rules={[{ required: true, message: 'Username wajib diisi' }]}
                            >
                                <Input 
                                    prefix={<IdcardOutlined className="text-slate-400" />} 
                                    placeholder="salsadev" 
                                    className="!h-12 !rounded-xl"
                                />
                            </Form.Item>
                        </Col>
                        {/* email*/}
                        <Col span={12}>
                            <Form.Item
                                label={<Text strong className="text-slate-600">Email</Text>}
                                name="email"
                                rules={[
                                    { required: true, message: 'Email wajib diisi' },
                                    { type: 'email', message: 'Format email salah' }
                                ]}
                            >
                                <Input 
                                    prefix={<MailOutlined className="text-slate-400" />} 
                                    placeholder="salsabila@kiru.id" 
                                    className="!h-12 !rounded-xl"
                                />
                            </Form.Item>
                        </Col>
                        {/* password */}
                        <Col span={12}>
                            <Form.Item
                                label={<Text strong className="text-slate-600">Password</Text>}
                                name="password"
                                rules={[{ required:  initialData ? false : true, message: 'Password wajib diisi' }]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined className="text-slate-400" />} 
                                    placeholder="••••••••" 
                                    className="!h-12 !rounded-xl"
                                />
                            </Form.Item>
                        </Col>
                        {/* role */}
                        <Col span={8}>
                            <Form.Item
                                label={<Text strong className="text-slate-600">Role</Text>}
                                name="role"
                                rules={[{ required: true, message: 'Pilih role' }]}
                            >
                                <Select 
                                    placeholder="Pilih Role"
                                    className="w-full !h-12"
                                    suffixIcon={<SafetyCertificateOutlined />}
                                    options={roles}
                                    loading={roles.length === 0} 
                                    disabled={roles.length === 0} 
                                />
                            </Form.Item>
                        </Col>
                        {/* branch */}
                        <Col span={8}>
                            <Form.Item
                                label={<Text strong className="text-slate-600">Branch</Text>}
                                name="branch"
                                rules={[{ required: true, message: 'Pilih branch' }]}
                            >
                                <Select 
                                    placeholder="Pilih Branch"
                                    className="w-full !h-12"
                                    suffixIcon={<EnvironmentOutlined />}
                                    options={branches}
                                    loading={branches.length === 0} 
                                    disabled={branches.length === 0} 
                                />
                            </Form.Item>
                        </Col>
                        {/* status */}
                        <Col span={8}>
                            <Form.Item
                                label={<Text strong className="text-slate-600">Status</Text>}
                                name="status"
                                initialValue="active"
                            >
                                <Select 
                                    className="w-full !h-12"
                                    suffixIcon={<CheckCircleOutlined />}
                                    options={[
                                        { value: 'active', label: 'Active' },
                                        { value: 'inactive', label: 'Inactive' },
                                        { value: 'banned', label: 'Banned' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="mt-12 flex gap-4">
                        <Button 
                            onClick={onCancel}
                            className="!h-14 flex-1 !rounded-2xl border-none bg-slate-100 text-slate-500 font-bold hover:!bg-slate-200 uppercase tracking-wider"
                        >
                            Batal
                        </Button>
                        <Button 
                            type="primary"
                            onClick={handleSave}
                            className="!h-14 flex-1 !rounded-2xl border-none bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-200 hover:!bg-indigo-700 uppercase tracking-wider"
                        >
                            Simpan User
                        </Button>
                    </div>
                </Form>
            </Spin>

            <style >{`
                .modern-modal .ant-modal-content {
                    border-radius: 40px !important;
                    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.15) !important;
                }
                .ant-select-selector {
                    border-radius: 12px !important;
                    border-color: #e2e8f0 !important;
                    display: flex;
                    align-items: center;
                }
                .ant-form-item-label label {
                    font-size: 13px !important;
                    text-transform: uppercase;
                    letter-spacing: 0.025em;
                }
            `}</style>
        </Modal>
    );
}

export function ModalAddStock({
    isVisible,
    onCancel,
    onSave,
    loading    = false,
    product    = null,   
    branches   = [],     
    isOwner    = false, 
    userBranch = null,  
}) {
    const [form] = Form.useForm();

    const baseUnit = product?.units?.find((u) => u.isBase);
 
    useEffect(() => {
        if (isVisible) {
            if (!isOwner ) {
                const foundBranch = branches.find(b => b.branch_name?.toLowerCase() === userBranch.branch?.toLowerCase());
                form.setFieldsValue({ branchId: foundBranch.id });
            }
        } else {
            form.resetFields();
        }
    }, [isVisible, isOwner, userBranch, form]);
 
    const onFinish = async (values) => {
        await onSave?.({
            productId: product?.id,
            branchId:  values.branchId,
            qty:       values.qty,
        });
    };
 
    return (
        <Modal
            title={null}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            width={480}
            zIndex={2000}
            centered
            destroyOnHidden
            className="modern-modal"
            styles={{ body: { padding: '32px' } }}
        >
            {/* Header */}
            <Flex gap={14} align="center" className="mb-8">
                <div className="p-3 bg-violet-100 text-violet-600 rounded-2xl">
                    <EnvironmentOutlined style={{ fontSize: '22px' }} />
                </div>
                <div>
                    <Title level={4} className="!m-0 !font-black !tracking-tight">
                        Tambah Stok
                    </Title>
                    <Text className="text-slate-400 font-medium text-sm">
                        {product?.name ?? '—'}
                    </Text>
                </div>
            </Flex>
 
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="branchId"
                    label={<Text className="font-bold text-slate-700">Cabang</Text>}
                    rules={[{ required: false, message: 'Pilih cabang tujuan' }]}
                    initialValue={userBranch?.id}
                >
                    <Select
                        placeholder={!isOwner ? userBranch.name : "Pilih Cabang"}
                        className="!h-12"
                        disabled={!isOwner} // Select akan terkunci jika bukan owner
                        options={branches.map((b) => ({ value: b.id, label: b.name })) }
                    />
                </Form.Item>
 
                {/* Info tambahan untuk admin */}
                {!isOwner && userBranch && (
                    <div className="bg-violet-50 p-3 rounded-xl -mt-3 mb-4">
                        <Text className="text-violet-600 text-xs font-bold">
                            Stok akan ditambahkan ke cabang: {userBranch.name}
                        </Text>
                    </div>
                )}
 
                {/* Qty */}
                <Form.Item
                    name="qty"
                    label={
                        <Text className="font-bold text-slate-700">
                            Jumlah Stok{baseUnit ? ` (${baseUnit.name})` : ''}
                        </Text>
                    }
                    rules={[{ required: true, message: 'Masukkan jumlah stok' }]}
                >
                    <InputNumber
                        min={1}
                        className="!w-full !h-12 !rounded-2xl"
                        placeholder="0"
                        formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(v) => v.replace(/,*/g, '')}
                    />
                </Form.Item>
 
                {/* Footer */}
                <Flex gap={12} justify="end" className="pt-4 border-t border-slate-50">
                    <Button
                        onClick={onCancel}
                        className="!h-12 !px-6 !rounded-2xl font-bold text-slate-400 border-none hover:!bg-slate-100"
                    >
                        Batal
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="!h-12 !px-8 !rounded-2xl !bg-violet-600 font-black border-none shadow-lg shadow-violet-100"
                    >
                        Simpan Stok
                    </Button>
                </Flex>
            </Form>
 
            <style>{`
                .modern-modal .ant-modal-content { border-radius: 32px !important; overflow: hidden; }
            `}</style>
        </Modal>
    );
}

export function ModalManageCategory({isVisible, onCancel,onCategoryChange, }) {
    const { message } = AntdApp.useApp();
    const [form] = Form.useForm();
    const [searchText, setSearchText]  = useState('');
    const [editingId, setEditingId]   = useState(null);
    const [categories, setCategories]  = useState([]);
    const [loading, setLoading]     = useState(false);
 
    // Fetch kategori saat modal dibuka
    useEffect(() => {
        if (isVisible) {
            fetchCategories();
        } else {
            setEditingId(null);
            setSearchText('');
            form.resetFields();
        }
    }, [isVisible]);
 
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const result = await productService.getCategories();
            console.log(result.data?.categories)
            setCategories(result.data?.categories ?? []);
        } catch {
            message.error('Gagal memuat kategori');
        } finally {
            setLoading(false);
        }
    };
 
    const filteredCategories = useMemo(() => {
        return categories.filter((c) =>
            c.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [categories, searchText]);
 
    const handleSave = async () => {
        const name = form.getFieldValue('categoryName')?.trim();
        if (!name) return;
 
        setLoading(true);
        try {
            if (editingId) {
                const response = await productService.updateCategory(editingId, { name });
                message.success(response.message);
                setEditingId(null);
            } else {
                const response = await productService.createCategory({ name });
                message.success(response.message);
            }
            form.resetFields();
            await fetchCategories();
            onCategoryChange?.();
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Gagal menyimpan kategori';
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    };
 
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const response = await productService.deleteCategory(id);
            message.success(response.message);
            if (editingId === id) {
                setEditingId(null);
                form.resetFields();
            }
            await fetchCategories();
            onCategoryChange?.();
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Gagal menghapus kategori';
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    };
 
    const startEdit = (cat) => {
        setEditingId(cat.id);
        form.setFieldsValue({ categoryName: cat.name });
    };
 
    const cancelEdit = () => {
        setEditingId(null);
        form.resetFields();
    };
 
    return (
        <Modal
            title={null}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            width={700}
            centered
            destroyOnHidden
            zIndex={2000}
            className="modern-modal"
            styles={{ body: { padding: 0 } }}
        >
            <div className="p-8">
                {/* Header */}
                <Flex gap={20} align="center" className="mb-10">
                    <div className="p-5 bg-violet-600 text-white rounded-[24px] shadow-xl shadow-violet-100">
                        <TagsOutlined style={{ fontSize: '28px' }} />
                    </div>
                    <div>
                        <Title level={2} className="!m-0 !font-black !tracking-tight">
                            Kelola Kategori
                        </Title>
                        <Text className="text-slate-400 font-medium text-base">
                            Atur kategori produk Kiru App Anda
                        </Text>
                    </div>
                </Flex>
 
                {/* Form */}
                <div className={`p-8 rounded-[32px] border transition-colors mb-8 ${
                    editingId ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'
                }`}>
                    <Form form={form} layout="vertical">
                        <Row gutter={16} align="bottom">
                            <Col span={18}>
                                <Form.Item
                                    name="categoryName"
                                    label={
                                        <Text className="font-black text-slate-700 uppercase text-[11px] tracking-widest ml-1">
                                            {editingId ? 'Ubah Nama Kategori' : 'Kategori Baru'}
                                        </Text>
                                    }
                                    className="!mb-0"
                                >
                                    <Input
                                        placeholder="Contoh: Perabotan Rumah"
                                        className="!h-16 !rounded-2xl border-none shadow-sm px-6 text-base font-bold"
                                        onPressEnter={handleSave}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Button
                                    type="primary"
                                    block
                                    loading={loading}
                                    onClick={handleSave}
                                    icon={editingId ? <CheckOutlined /> : <PlusOutlined />}
                                    className={`!h-16 !rounded-2xl border-none font-black shadow-lg ${
                                        editingId
                                            ? '!bg-amber-500 shadow-amber-100'
                                            : '!bg-violet-600 shadow-violet-100'
                                    }`}
                                >
                                    {editingId ? 'Simpan' : 'Tambah'}
                                </Button>
                            </Col>
                        </Row>
                        {editingId && (
                            <Button
                                type="text"
                                size="small"
                                icon={<CloseOutlined />}
                                className="mt-2 text-amber-600 font-bold"
                                onClick={cancelEdit}
                            >
                                Batalkan Edit
                            </Button>
                        )}
                    </Form>
                </div>
 
                {/* Search */}
                <div className="mb-6 px-2">
                    <Input
                        prefix={<SearchOutlined className="text-slate-300" />}
                        placeholder="Cari kategori dari daftar..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="!rounded-xl border-slate-100 bg-white py-3 shadow-sm"
                    />
                </div>
 
                {/* List */}
                <div className="max-h-[380px] overflow-y-auto pr-3 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {filteredCategories.length > 0 ? (
                            <Flex vertical gap={12}>
                                {filteredCategories.map((cat) => (
                                    <motion.div
                                        layout
                                        key={cat.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={`category-card flex justify-between items-center p-5 bg-white rounded-2xl border transition-all group hover:shadow-md ${
                                            editingId === cat.id
                                                ? 'border-amber-300 bg-amber-50'
                                                : 'border-slate-50 hover:border-violet-200'
                                        }`}
                                    >
                                        <Flex align="center" gap={16}>
                                            <Avatar
                                                className={`font-black rounded-xl transition-colors ${
                                                    editingId === cat.id
                                                        ? '!bg-amber-500'
                                                        : '!bg-violet-100 !text-violet-600'
                                                }`}
                                            >
                                                {cat.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <div>
                                                <Text className="font-black text-slate-700 text-base block">
                                                    {cat.name}
                                                </Text>
                                                <Text className="text-[11px] text-slate-400 font-bold uppercase">
                                                    {cat.productCount ?? 0} Produk Terhubung
                                                </Text>
                                            </div>
                                        </Flex>
                                        <Space>
                                            <Button
                                                type="text"
                                                icon={
                                                    <EditOutlined className="text-slate-400 group-hover:text-violet-600" />
                                                }
                                                onClick={() => startEdit(cat)}
                                            />
                                            <Popconfirm
                                                title="Hapus Kategori"
                                                description="Produk terkait kategori ini akan menjadi 'Tanpa Kategori'. Lanjutkan?"
                                                onConfirm={() => handleDelete(cat.id)}
                                                okText="Ya, Hapus"
                                                cancelText="Batal"
                                                okButtonProps={{ danger: true, className: '!rounded-lg' }}
                                                cancelButtonProps={{ className: '!rounded-lg' }}
                                            >
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                            </Popconfirm>
                                        </Space>
                                    </motion.div>
                                ))}
                            </Flex>
                        ) : (
                            <Empty
                                description={
                                    <Text className="text-slate-400 font-medium">
                                        Kategori tidak ditemukan
                                    </Text>
                                }
                                className="my-10"
                            />
                        )}
                    </AnimatePresence>
                </div>
 
                <Button
                    block
                    className="mt-10 !h-14 !rounded-2xl font-black text-slate-400 border-slate-100 uppercase tracking-widest text-[11px] hover:!text-slate-600"
                    onClick={onCancel}
                >
                    Selesai & Tutup
                </Button>
            </div>
 
            <style>{`
                .modern-modal .ant-modal-content { border-radius: 40px !important; overflow: hidden; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .category-card { transition: transform 0.15s; }
                .category-card:hover { transform: translateY(-2px); }
            `}</style>
        </Modal>
    );
}
 
export function ModalProduct({
    isVisible,
    onCancel,
    onSave,
    loading = false,
    initialData = null, 
    categories  = [],   
}) {
    const [form]  = Form.useForm();
    const isEdit  = !!initialData;
 
    // Saat modal dibuka, isi form atau reset
    useEffect(() => {
        if (isVisible) {
            if (initialData) {
                form.setFieldsValue({
                    name:         initialData.name,
                    category_ids: initialData.categories?.map((c) => c.id) ?? [],
                    units:        initialData.units ?? [],
                });
            } else {
                form.setFieldsValue({
                    units: [{
                        unit_name:      '',
                        multiplier:     1,
                        is_base_unit:   true,
                        purchase_price: 0,
                        selling_price:  0,
                    }],
                });
            }
        } else {
            form.resetFields();
        }
    }, [isVisible, initialData, form]);
 
    const onFinish = async (values) => {

        await onSave?.({
            name:       values.name,
            categories: values.category_ids ?? [],
            units:      values.units,
        });
    };
 
    return (
        <Modal
            title={null}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            width={850}
            zIndex={2000}
            centered
            destroyOnHidden
            className="modern-modal"
            styles={{ body: { padding: '32px' } }}
        >
            {/* Header */}
            <Flex gap={16} align="center" className="mb-8">
                <div>
                    <Title level={3} className="!m-0 !font-black !tracking-tight">
                        {isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}
                    </Title>
                    <Text className="text-slate-400 font-medium">
                        Kelola informasi produk dan multi-level satuan
                    </Text>
                </div>
            </Flex>
 
            <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
                <Row gutter={32}>
 
                    {/* Info Utama */}
                    <Col span={10}>
                        <Form.Item
                            label={<Text className="font-bold text-slate-700">Nama Produk</Text>}
                            name="name"
                            rules={[{ required: true, message: 'Nama produk wajib diisi' }]}
                        >
                            <Input
                                placeholder="Contoh: Aqua 600ml"
                                className="!h-14 !rounded-2xl bg-slate-50 border-slate-100 font-bold text-base px-5"
                            />
                        </Form.Item>
 
                        <Form.Item
                            label={<Text className="font-bold text-slate-700">Pilih Kategori</Text>}
                            name="category_ids"
                        >
                            <Select
                                mode="multiple"
                                placeholder="Pilih satu atau lebih..."
                                maxTagCount="responsive"
                                optishonFilterProp="label"
                                className="!min-h-[48px]"
                                options={categories.map((c) => ({ value: c.id, label: c.name }))}
                            />
                        </Form.Item>
 
                        <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100 mt-2">
                            <Flex gap={10}>
                                <InfoCircleOutlined className="text-blue-500 mt-1" />
                                <Text className="text-blue-700 text-xs leading-relaxed">
                                    <b>Tips:</b> Gunakan <b>Multiplier</b> untuk konversi.
                                    Misal: 1 Dus (Multiplier: 12) berisi 12 Pcs (satuan dasar).
                                </Text>
                            </Flex>
                        </div>
                    </Col>
 
                    {/* Multi-unit */}
                    <Col span={14}>
                        <Divider orientation="left" className="!m-0 !mb-4">
                            <Text className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">
                                Konversi Satuan & Harga
                            </Text>
                        </Divider>
 
                        <Form.List
                            name="units"
                            rules={[{
                                validator: async (_, units) => {
                                    if (!units || units.length === 0)
                                        return Promise.reject('Minimal satu satuan harus diisi');
                                    const baseCount = units.filter((u) => u?.is_base_unit).length;
                                    if (baseCount === 0)
                                        return Promise.reject('Satu satuan harus dijadikan satuan dasar (Base)');
                                    if (baseCount > 1)
                                        return Promise.reject('Hanya boleh ada satu satuan dasar');
                                },
                            }]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <div className="max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div
                                            key={key}
                                            className="unit-card p-5 bg-white rounded-[28px] border border-slate-100 mb-4 relative hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all"
                                        >
                                            <Row gutter={[12, 12]}>
                                                <Col span={14}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'unit_name']}
                                                        label={
                                                            <Text className="text-[10px] font-black text-slate-400 uppercase">
                                                                Nama Satuan
                                                            </Text>
                                                        }
                                                        rules={[{ required: true, message: '!' }]}
                                                        className="!mb-0"
                                                    >
                                                        <Input
                                                            placeholder="Pcs / Dus / Pak"
                                                            className="!rounded-xl border-slate-200 font-bold"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'multiplier']}
                                                        label={
                                                            <Text className="text-[10px] font-black text-slate-400 uppercase">
                                                                Isi
                                                            </Text>
                                                        }
                                                        className="!mb-0"
                                                    >
                                                        <InputNumber
                                                            min={1}
                                                            className="w-full !rounded-xl border-slate-200 font-bold"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={4}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'is_base_unit']}
                                                        label={
                                                            <Text className="text-[10px] font-black text-slate-400 uppercase">
                                                                Base?
                                                            </Text>
                                                        }
                                                        valuePropName="checked"
                                                        className="!mb-0 text-center"
                                                    >
                                                        <Switch size="small" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'purchase_price']}
                                                        label={
                                                            <Text className="text-[10px] font-black text-slate-400 uppercase">
                                                                Harga Beli
                                                            </Text>
                                                        }
                                                        className="!mb-0"
                                                    >
                                                        <InputNumber
                                                            prefix={<Text className="text-slate-300">Rp</Text>}
                                                            className="w-full !rounded-xl border-slate-200 font-bold"
                                                            formatter={(v) =>
                                                                `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                            }
                                                            parser={(v) => v.replace(/,*/g, '')}
                                                            min={0}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'selling_price']}
                                                        label={
                                                            <Text className="text-[10px] font-black text-slate-400 uppercase">
                                                                Harga Jual
                                                            </Text>
                                                        }
                                                        className="!mb-0"
                                                    >
                                                        <InputNumber
                                                            prefix={<Text className="text-slate-300">Rp</Text>}
                                                            className="w-full !rounded-xl border-slate-200 font-bold text-indigo-600"
                                                            formatter={(v) =>
                                                                `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                            }
                                                            parser={(v) => v.replace(/,*/g, '')}
                                                            min={0}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
 
                                            {fields.length > 1 && (
                                                <Button
                                                    danger
                                                    type="text"
                                                    size="small"
                                                    className="delete-unit opacity-0 absolute -top-2 -right-2 bg-white shadow-md rounded-full hover:bg-red-50"
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => remove(name)}
                                                />
                                            )}
                                        </div>
                                    ))}
 
                                    <Form.ErrorList
                                        errors={errors}
                                        className="mb-3 text-red-500 text-xs"
                                    />
 
                                    <Button
                                        type="dashed"
                                        onClick={() =>
                                            add({
                                                unit_name:      '',
                                                multiplier:     1,
                                                is_base_unit:   false,
                                                purchase_price: 0,
                                                selling_price:  0,
                                            })
                                        }
                                        block
                                        icon={<PlusOutlined />}
                                        className="!h-14 !rounded-2xl border-indigo-100 text-indigo-500 font-bold uppercase text-[11px] tracking-widest bg-indigo-50/30 hover:bg-indigo-50"
                                    >
                                        Tambah Level Satuan
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                    </Col>
                </Row>
 
                {/* Footer */}
                <Flex gap={12} justify="end" className="mt-5 pt-6 border-t border-slate-50">
                    <Button
                        size="large"
                        onClick={onCancel}
                        className="!h-14 !px-8 !rounded-2xl font-bold text-slate-400 border-none hover:!bg-slate-100"
                    >
                        Batal
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="!h-14 !px-12 !rounded-2xl !bg-indigo-600 font-black shadow-xl shadow-indigo-100 border-none"
                    >
                        {isEdit ? 'Simpan Perubahan' : 'Buat Produk Sekarang'}
                    </Button>
                </Flex>
            </Form>
 
            <style>{`
                .modern-modal .ant-modal-content { border-radius: 40px !important; overflow: hidden; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .unit-card:hover .delete-unit { opacity: 1 !important; }
            `}</style>
        </Modal>
    );
}
 
export default function ReceiptModal({ isVisible, onClose, transaction, storeName }) {
    const printRef = useRef(null);

    if (!transaction) return null;

    const handleGeneratePDF = async () => {
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 3, // Biar tajam
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff"
        });

        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [80, 150] // Ukuran lebar 80mm, tinggi disesuaikan
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Struk-${transaction.id.slice(-8).toUpperCase()}.pdf`);
    };

    const dateLabel = new Date(transaction.transaction_date).toLocaleString('id-ID', {
        day: '2-digit', month: '2-digit', year: '2-digit',
        hour: '2-digit', minute: '2-digit',
    });

    const ReceiptRow = ({ label, value, isBold = false, fontSize = 12 }) => (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            margin: '2px 0',
            fontWeight: isBold ? 'bold' : 'normal',
            fontSize: fontSize,
            color: '#000'
        }}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    );

    const DashDivider = () => (
        <div style={{ borderTop: '1px dashed #000', margin: '8px 0', width: '100%' }} />
    );

    return (
        <Modal
            open={isVisible}
            onCancel={onClose}
            footer={null}
            centered
            width={360}
            styles={{ body: { padding: 0 } }}
        >
            <div className="bg-green-50 border-b border-green-100 px-6 py-4 flex items-center gap-3 rounded-t-lg">
                <CheckCircleOutlined className="text-green-500 text-2xl" />
                <div>
                    <Text className="font-black text-green-700 block text-base">Transaksi Berhasil!</Text>
                    <Text className="text-green-500 text-xs font-mono">
                        REF: {transaction.id.slice(-8).toUpperCase()}
                    </Text>
                </div>
            </div>

            {/* Preview */}
            <div className="px-8 py-6 overflow-y-auto bg-gray-50" style={{ maxHeight: '60vh' }}>
                <div 
                    ref={printRef} 
                    style={{ 
                        padding: '20px', 
                        backgroundColor: '#fff', 
                        fontFamily: "'Courier New', Courier, monospace",
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                >
                    <div style={{ textAlign: 'center', color: '#000' }}>
                        <div style={{ fontSize: 16, fontWeight: 'bold' }}>{storeName}</div>
                        <div style={{ fontSize: 11 }}>{transaction.branch_name}</div>
                        <div style={{ fontSize: 10 }}>{transaction.branch_address}</div>
                    </div>

                    <DashDivider />

                    <div style={{ fontSize: 10, color: '#000' }}>
                        <div>Tgl: {dateLabel}</div>
                        <div>Kasir: {transaction.cashier_name ?? '—'}</div>
                    </div>

                    <DashDivider />

                    {transaction.items.map((item) => (
                        <div key={item.id} style={{ marginBottom: 10, color: '#000' }}>
                            <div style={{ fontWeight: 'bold', fontSize: 12 }}>{item.product_name}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, paddingLeft: 4 }}>
                                <span>
                                    {Number(item.quantity)} {item.unit_name} x {item.unit_price.toLocaleString('id-ID')}
                                </span>
                                <span>{item.subtotal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    ))}

                    <DashDivider />

                    <ReceiptRow 
                        label="TOTAL" 
                        value={`Rp ${transaction.subtotal.toLocaleString('id-ID')}`} 
                        isBold 
                        fontSize={14} 
                    />

                    <DashDivider />

                    {transaction.cash_amount != null && (
                        <>
                            <ReceiptRow 
                                label="Tunai" 
                                value={transaction.cash_amount.toLocaleString('id-ID')} 
                            />
                            <ReceiptRow 
                                label="Kembali" 
                                value={transaction.change_amount.toLocaleString('id-ID')} 
                                isBold 
                            />
                            <DashDivider />
                        </>
                    )}

                    <div style={{ textAlign: 'center', fontSize: 10, marginTop: 10, color: '#000' }}>
                        Terima kasih telah berbelanja!
                    </div>
                </div>
            </div>

            {/* Cetaj Struk/simpan pdf dan batal */}
            <div className="px-6 pb-6 pt-2 bg-white rounded-b-lg">
                <Divider className="!my-4" />
                <Flex gap={12}>
                    <Button
                        block
                        onClick={onClose}
                        className="!h-12 !rounded-xl font-bold text-gray-600 border-gray-300"
                    >
                        Tutup
                    </Button>
                    <Button
                        type="primary"
                        block
                        icon={<DownloadOutlined />}
                        onClick={handleGeneratePDF}
                        className="!h-12 !rounded-xl !bg-indigo-600 hover:!bg-indigo-700 border-none font-bold"
                    >
                        Simpan PDF
                    </Button>
                </Flex>
            </div>
        </Modal>
    );
}



