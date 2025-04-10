import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
