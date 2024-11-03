import { TUser } from '@utils-types';
import {
  getUserApi,
  TLoginData,
  TRegisterData,
  registerUserApi,
  loginUserApi,
  logoutApi,
  updateUserApi
} from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface UserState {
  user: TUser | null;
  isAuthorized: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  user: null,
  isAuthorized: false,
  isLoading: false,
  error: null
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const userData = await loginUserApi(data);
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const userData = await registerUserApi(data);
    return userData.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => {
    const userData = await updateUserApi(data);
    return userData.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.user = null;
        state.isAuthorized = false;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не смог загрузить пользователя';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorized = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не смог залогинить пользователя';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorized = true;
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не смог обновить информацию пользователя';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось выйти из аккаунта';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthorized = false;
        state.user = null;
      });
  },
  selectors: {
    selectorUserData: (state) => state.user,
    selectorUserAuthorized: (state) => state.isAuthorized
  }
});

export const { selectorUserData, selectorUserAuthorized } = userSlice.selectors;
export default userSlice.reducer;
