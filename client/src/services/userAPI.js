// userAPI.js
import { getRequest, postRequest, putRequest, deleteRequest, postRequestWithFiles, putRequestWithFiles } from "./axiosClient";

export const getAllUsers = async (query) => {
  try {
    const response = await getRequest('users', query); // Ensure the URL is correct
    return response.data;
  } catch (error) {
    console.log('[GET users error]', error);
    return {
      users: [],
      total: 0,
    };
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    await putRequest(`users/${userId}/status`, { status }); // Ensure the URL is correct
  } catch (error) {
    console.error('[UPDATE user status error]', error);
    throw error;
  }
};

export const updateUserDetails = async (userId, formData) => {
  try {
    const response = await putRequestWithFiles(`users/${userId}`, formData); // Ensure the URL is correct
    return response.data;
  } catch (error) {
    console.error('[UPDATE user details error]', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await deleteRequest(`users/${userId}`); // Ensure the URL is correct
  } catch (error) {
    console.error('[DELETE user error]', error);
    throw error;
  }
};

export const createUser = async (formData) => {
  try {
    const response = await postRequestWithFiles('users', formData); // Ensure the URL is correct
    return response.data;
  } catch (error) {
    console.error('[CREATE user error]', error);
    throw error;
  }
};