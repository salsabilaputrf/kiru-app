import api from "./api";

export const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        const token = response.data?.data?.accessToken;
        const user = response.data?.data?.user;

        if (token) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('user_detail', JSON.stringify(user))
        }

        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_detail');
    }
};