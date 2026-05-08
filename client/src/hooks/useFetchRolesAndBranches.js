import { useState, useEffect } from 'react';
import { userService } from '@/services/userService';

export function useFetchRolesAndBranches(isVisible){
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!isVisible) return;

            setLoading(true);
            try {
                const [roleRes, branchRes] = await Promise.all([
                    userService.getRoles(),
                    userService.getBranches()
                ]);
                

                setRoles(roleRes.data?.roles.map(r => ({
                    
                    label: r.role_name,
                    value: r.role_name
                })));

                setBranches(branchRes.data?.branches.map(b => ({
                    label: b.name,
                    value: b.name
                })));
            } catch (error) {
                console.error("Gagal mengambil data referensi:", error);
            }  finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isVisible]); 

    return { roles, branches, loading };
};