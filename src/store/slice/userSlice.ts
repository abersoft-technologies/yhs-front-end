import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUserModel } from '../../types/global';

const initialState: IUserModel = {
  user: {
    status: null,
    data: {
      token: '',
      user: {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        id: '',
      },
    },
    message: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IUserModel>) => {
      state = { ...action.payload };
    },
  },
});

export const { add } = userSlice.actions;

export const SelectCurrentUser = (state: RootState) => state.userReducer.user;

export default userSlice.reducer;
