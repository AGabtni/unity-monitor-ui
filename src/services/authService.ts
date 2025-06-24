import axios from 'axios';
import type { UserLogin, User } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const authService = {
    async login(credentials: UserLogin): Promise<User> {
        try {

            const response = await axios.post<User>(
                `${API_BASE_URL}/auth/login`,
                credentials
            );

            const data = response.data;
            localStorage.setItem('token', data.jwt);

            return data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Login failed');
            }
            throw new Error('Unknown error occurred');
        }
    },

    logout(): void {
        localStorage.removeItem('token');
    }

}