import axios from 'axios';

const API_URL = 'https://localhost:7050/api/login/login';

export interface LoginResponse {
  success: boolean;
  message: string;
}


export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(API_URL, {
      username,
      password,
    });

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error de conexión',
    };
  }
};
