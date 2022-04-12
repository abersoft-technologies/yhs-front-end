import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUserModelRedux } from '../../types/global';

interface StateObject {
    status: null,
    data: {
      token: string;
      user: {
        firstName: string,
          lastName: string,
          email: string,
          date: string,
          id: string,
      }
    }
    message: string;
}

const initialState: StateObject = {
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
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<StateObject>) => {
      return action.payload;
    },
  },
});

export const { add } = userSlice.actions;

export const SelectCurrentUser = (state: RootState) => state.userReducer.data.user;

export default userSlice.reducer;
