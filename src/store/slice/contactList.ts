import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';

export const getContactListRedux: any = createAsyncThunk(
  'redux/contactList',
  async (dispatch: any, getState) => {
    const { limit, page, queryParams, filterQuery } = dispatch;
    const filterParams = new URLSearchParams(filterQuery).toString();
    const response = await api.get(
      `/contact?limit=${limit}&page=${page}&queryParams=${queryParams}&${filterParams}`
    );
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
