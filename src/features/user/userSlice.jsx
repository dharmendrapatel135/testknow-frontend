// src/features/counter/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo : '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDetails: (state, action) => {
      state.userInfo = action.payload;
    },

  },
});

export const { userDetails } = userSlice.actions;
export default userSlice.reducer;
