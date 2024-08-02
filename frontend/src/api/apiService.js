import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials) => {
  try {
    const response = await apiService.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default apiService;
