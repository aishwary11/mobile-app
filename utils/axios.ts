import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  cancelToken: axios.CancelToken.source().token,
});

export default axiosInstance;
