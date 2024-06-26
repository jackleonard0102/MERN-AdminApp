// redux/auth/authAPI.js

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import {
  login,
  register,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  getUser,
  getUserSuccess,
  getUserFailure,
  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,
  updatePassword,
  updatePasswordSuccess,
  updatePasswordFailure,
  deleteAccount,
  deleteAccountFailure,
  // Import the new action for updating login page logo
  updateLoginLogo,
} from './authSlice';
import { getRequest, postRequest, postRequestWithFiles } from '../../services/axiosClient'; // Include postRequestWithFiles
import { setStorage } from '../../helpers';

function* loginAPI(action) {
  try {
    const response = yield call(() => postRequest('auth/login', action.payload));
    yield setStorage('token', response.data.token);
    yield put(loginSuccess(response.data));
  } catch (e) {
    let email = e.response.data?.errors?.email ?? 'These credentials do not match our records.';
    yield put(loginFailure({
      errors: {
        email,
      },
    }));
  }
}

function* registerAPI(action) {
  try {
    const { search, ...rest } = action.payload;
    const response = yield call(() => postRequest('auth/register' + search, rest));
    yield setStorage('token', response.data.token);
    yield put(loginSuccess({ ...response.data }));
  } catch (e) {
    yield put(loginFailure(e.response.data));
  }
}

function* updateProfileAPI(action) {
  try {
    const response = yield call(() => postRequest('users/updateProfile', action.payload));
    message.success('Profile updated successfully!');
    yield put(updateProfileSuccess(response.data));
  } catch (e) {
    yield put(updateProfileFailure());
  }
}

function* updatePasswordAPI(action) {
  try {
    const response = yield call(() => postRequest('users/updatePassword', action.payload));
    message.success('Password updated successfully!');
    yield put(updatePasswordSuccess());
  } catch (e) {
    yield put(updatePasswordFailure(e.response.data));
  }
}

function* deleteAccountAPI(action) {
  try {
    const response = yield call(() => postRequest('users/deleteAccount', action.payload));
    message.success('Your account successfully deleted!');
    yield put(logoutSuccess());
  } catch (e) {
    yield put(deleteAccountFailure(e.response.data));
  }
}

function* logoutAPI() {
  try {
    yield setStorage('token');
    yield put(logoutSuccess());
  } catch (e) {
    // Handle logout failure if necessary
  }
}

function* getUserAPI() {
  try {
    const response = yield call(() => getRequest('users/me'));
    yield put(getUserSuccess(response.data));
  } catch (e) {
    yield setStorage('token');
    yield put(getUserFailure());
  }
}

// New saga function for uploading login page logo
function* uploadLoginLogoAPI(action) {
  try {
    const formData = new FormData();
    formData.append('file', action.payload.file);

    const response = yield call(() => postRequestWithFiles('logos/upload', formData));
    yield put(updateLoginLogo({ logoUrl: response.data.logoUrl }));
    message.success('Login page logo uploaded successfully!');
  } catch (e) {
    console.error('Error uploading login page logo:', e);
    message.error('Failed to upload login page logo.'); // Add error message for user feedback
  }
}


export default function* rootSaga() {
  yield all([
    takeLatest(login, loginAPI),
    takeLatest(register, registerAPI),
    takeLatest(logout, logoutAPI),
    takeLatest(getUser, getUserAPI),
    takeLatest(updateProfile, updateProfileAPI),
    takeLatest(updatePassword, updatePasswordAPI),
    takeLatest(deleteAccount, deleteAccountAPI),
    // Add the new saga watcher for uploading login page logo
    takeLatest(updateLoginLogo, uploadLoginLogoAPI),
  ]);
}
