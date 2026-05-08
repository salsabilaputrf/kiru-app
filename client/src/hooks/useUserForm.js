import { useEffect } from 'react';
import { Form } from 'antd';
import { useFetchRolesAndBranches } from './useFetchRolesAndBranches';

export function useUserForm (isVisible, initialData, onSave){
    const [form] = Form.useForm();
    
    const { roles, branches, loading } = useFetchRolesAndBranches(isVisible);

    useEffect(() => {
        if (isVisible) {
            if (initialData) {
                form.setFieldsValue({
                    name: initialData.name,
                    username: initialData.username,
                    email: initialData.email,
                    role: initialData.role,
                    branch: initialData.branch,
                    status: initialData.status
                });
            } else {
                form.resetFields();
            }
        }
    }, [isVisible, initialData, form]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            onSave({ ...values, id: initialData?.id });
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    return { 
        form, 
        roles, 
        branches, 
        loading, 
        handleSave 
    };
};