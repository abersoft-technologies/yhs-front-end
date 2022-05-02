import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface StateObject {
  accessToken: string;
  refreshToken: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    date: string;
    id: string;
  };
}

const initialState: StateObject = {
  accessToken: '',
  refreshToken: '',
  user: {
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    id: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<StateObject>) => {
      return action.payload;
    },
    logout: (state) => {
      return state;
    },
  },
});

export const { add, logout } = userSlice.actions;

export const SelectCurrentUser = (state: RootState) => state.userReducer.user;

export default userSlice.reducer;
