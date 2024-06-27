// services/axiosClient.js

import axios from 'axios';
import constants from '../config/constants';
import { getStorage } from '../helpers';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = getStorage('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);

// Regular requests for JSON data
export const getRequest = (URL, params) => axiosClient.get(`/${URL}`, { params });
export const postRequest = (URL, payload) => axiosClient.post(`/${URL}`, payload);
export const patchRequest = (URL, payload) => axiosClient.patch(`/${URL}`, payload);
export const putRequest = (URL, payload) => axiosClient.put(`/${URL}`, payload);
export const deleteRequest = (URL) => axiosClient.delete(`/${URL}`);

// Axios instance for handling file uploads
const axiosClientWithFiles = axios.create({
  baseURL: constants.HOST_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'multipart/form-data',
  },
});

axiosClientWithFiles.interceptors.request.use((config) => {
  const token = getStorage('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Requests for handling file uploads
export const postRequestWithFiles = (url, data) => {
  return axiosClient.post(url, data);
};
export const putRequestWithFiles = (URL, formData) => axiosClientWithFiles.put(`/${URL}`, formData);

export default axiosClient;
