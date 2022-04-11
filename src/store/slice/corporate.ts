import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const getCorporateRedux: any = createAsyncThunk(
    'redux/corporate',
    async (dispatch: any, getState) => {
        const userData = useLocalStorage("get", "session", "user");
        const token = userData.data.token;
        const { id } = dispatch;
        const response = await api.get(`/corp/get?id=${id}`, {
            headers: { 'x-access-token': token },
        });
        return response.data;
    }
  )

  const corporateSlice = createSlice({
    name: 'corporate',
    initialState: {
      result: [],
      status: null,
    },
    reducers: {},
    extraReducers: {
      [getCorporateRedux.pending]: (
        state: any,
        action: PayloadAction<string>
      ) => {
        state.status = 'loading';
      },
      [getCorporateRedux.fulfilled]: (
        state: any,
        action: PayloadAction<string>
      ) => {
        state.status = 'success';
        state.result = action.payload;
      },
      [getCorporateRedux.rejected]: (
        state: any,
        action: PayloadAction<string>
      ) => {
        state.status = 'failed';
      },
    },
});

export default corporateSlice.reducer;