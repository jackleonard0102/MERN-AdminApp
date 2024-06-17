import { getRequest, postRequest, putRequest, deleteRequest } from "./axiosClient";

export const getAllUsers = async (query) => {
  try {
    const response = await getRequest('users', query);
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
    await putRequest(`users/${userId}/status`, { status });
  } catch (error) {
    console.error('[UPDATE user status error]', error);
  }
};

export const updateUserDetails = async (userId, formData) => {
  try {
    await putRequest(`users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    console.error('[UPDATE user details error]', error);
  }
};

export const deleteUser = async (userId) => {
  try {
    await deleteRequest(`users/${userId}`);
  } catch (error) {
    console.error('[DELETE user error]', error);
  }
};
