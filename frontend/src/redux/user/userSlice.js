import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLogin: false,
  chosenOptions: null,
  totalCost: null,
  userRole: 'unauthorized',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload
    },
    setChosenOptions: (state, action) => {
      state.chosenOptions = action.payload
    },
    setTotalCost: (state, action) => {
      state.totalCost = action.payload
    },
  },
})

export const { setChosenOptions, setTotalCost, setIsLogin, setUser, setUserRole, setAccessToken, setRefreshToken } = userSlice.actions;

export default userSlice;

// export const selectCurrentUser = (state) => state.user;
// export const selectUserPhoto = (state) => state.userPhoto;
