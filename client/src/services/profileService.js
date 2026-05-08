import api from "./api";

export const profileService = {
    getProfile: () => {
        const data = localStorage.getItem("user_detail");
        try {
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Format data profil rusak");
            return null;
        }
    },

    updatePassword: async (oldPassword, newPassword) => {

        const response = await api.put('/users/change-password', { oldPassword, newPassword });
        const success = response.data?.success;
        let message ;

        if (success === false) {
            message = "Password gagal diperbarui"
        }

        return response.data?.message;
    },
    
};