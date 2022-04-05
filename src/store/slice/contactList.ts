import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const getContactListRedux: any = createAsyncThunk(
  'redux/contactList',
  // http://localhost:8080/contact?limit=4&page=1&queryParams=j
  async (dispatch: any, getState) => {
    const userData = useLocalStorage('get', 'session', 'user');
    const token = userData.data.token;
    console.log(dispatch);
    const { limit, page, queryParams } = dispatch;
    const response = await api.get(`/contact?limit=${limit}&page=${page}`, {
      headers: { 'x-access-token': token },
    });
    return response.data;
  }
);

const contactListSlice = createSlice({
  name: 'contactList',
  initialState: {
    result: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [getContactListRedux.pending]: (
      state: any,
      action: PayloadAction<string>
    ) => {
      state.status = 'loading';
    },
    [getContactListRedux.fulfilled]: (
      state: any,
      action: PayloadAction<string>
    ) => {
      state.status = 'success';
      state.result = action.payload;
    },
    [getContactListRedux.rejected]: (
      state: any,
      action: PayloadAction<string>
    ) => {
      state.status = 'failed';
    },
  },
});

export default contactListSlice.reducer;
