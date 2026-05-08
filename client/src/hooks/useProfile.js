import { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { profileService } from '../services/profileService';

export const useProfile = (onCancel) => {
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const data = profileService.getProfile();
        if (data) setUserData(data);
    }, []);

    const handlePasswordSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const result = await profileService.updatePassword(values.oldPassword, values.newPassword);
           
            message.success(result);
            setIsChangingPassword(false);
            form.resetFields();
        } catch (err) {
            console.error("Validasi gagal atau error server:", err);
        } finally {
            setLoading(false);
        }
    };

    const resetModal = () => {
        setIsChangingPassword(false);
        form.resetFields();
        onCancel();
    };

    return {
        userData,
        isChangingPassword,
        setIsChangingPassword,
        form,
        loading,
        handlePasswordSubmit,
        resetModal
    };
};