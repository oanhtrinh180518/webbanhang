import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

// Tao async action
export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await userApi.login(username, password);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (
    { fullName, username, email, phoneNumber, password, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      return await userApi.register(
        fullName,
        username,
        email,
        phoneNumber,
        password,
        confirmPassword
      );
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getUserByToken = createAsyncThunk(
  "user/getUserByToken",
  async () => {
    return await userApi.getUserByToken();
  }
);

// get user by id
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId) => {
    console.log(userId);
    return await userApi.getUserById(userId);
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  ({
    FullName,
    Username,
    Email,
    PhoneNumber,
    Age,
    Birthday,
    Gender,
    Address,
  }) => {
    return userApi.updateUserInfo(
      FullName,
      Username,
      Email,
      PhoneNumber,
      Age,
      Birthday,
      Gender,
      Address
    );
  }
);

export const getAllMember = createAsyncThunk(
  "user/getAllMember",
  ({ PageIndex, PageSize, FullName, UserName, PhoneNumber, Active }) => {
    return userApi.getAllMember(
      PageIndex,
      PageSize,
      FullName,
      UserName,
      PhoneNumber,
      Active
    );
  }
);

// Admin update member activity
export const adminUpdateActive = createAsyncThunk(
  "user/adminUpdateActive",
  ({ isActive, memberId }) => {
    return userApi.updateMemberActive(isActive, memberId);
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotpassword",
  async ({ Email }, { rejectWithValue }) => {
    try {
      return await userApi.forgotPassword(Email);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (params, { rejectWithValue }) => {
    try {
      console.log(params);
      return await userApi.resetPassword(params);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/change-password",
  async (params, { rejectWithValue }) => {
    try {
      console.log(params);
      return await userApi.changePassword(params);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getAllUsernames = createAsyncThunk(
  "user/getAllUsernames",
  async (params, { rejectWithValue }) => {
    try {
      return await userApi.getAllUsernames();
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userInfo: null,
    loading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.loading = false;

      return state;
    },
    setAuth: (state, token) => {
      state.token = token.payload;
    },
  },
  extraReducers: {
    // Login
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      // luu data vao state tren store
      state.token = action.payload.result.token;
    },

    // Register
    [userRegister.pending]: (state) => {
      state.loading = true;
    },
    [userRegister.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      if (action.payload.errors) {
        if (action.payload.errors.Password) {
          state.errorMessage = action.payload.errors.Password;
        } else if (action.payload.errors.UserName) {
          state.errorMessage = action.payload.errors.UserName;
        }
      } else state.errorMessage = action.payload.message;
    },
    [userRegister.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      // luu data vao state tren store
      state.username = action.payload.result.userName;
    },

    // get userData
    [getUserByToken.pending]: (state) => {
      state.loading = true;
    },
    [getUserByToken.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.errorMessage = action.error;
    },
    [getUserByToken.fulfilled]: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.userInfo = action.payload;
    },

    // forgot password
    // [forgotPassword.pending]: (state) => {
    //   state.loading = true;
    // },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
    // [forgotPassword.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.isSuccess = true;
    // },

    // reset password
    // [resetPassword.pending]: (state) => {
    //   state.loading = true;
    // },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      if (action.payload.errors) {
        if (action.payload.errors.ConfirmNewPassword) {
          state.errorMessage = action.payload.errors.ConfirmNewPassword;
        }
      } else state.errorMessage = action.payload.message;
    },
    // [resetPassword.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.isSuccess = true;
    // luu data vao state tren store
    // },

    //  Change password
    [changePassword.pending]: (state) => {
      state.loading = true;
    },
    [changePassword.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
      if (action.payload.errors) {
        if (action.payload.errors.ConfirmNewPassword) {
          state.errorMessage = action.payload.errors.ConfirmNewPassword;
        }
      } else state.errorMessage = action.payload.message;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSuccess = true;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;
export const { clearState, setAuth } = actions;
export default userReducer;
export const userSelector = (state) => state.user;
