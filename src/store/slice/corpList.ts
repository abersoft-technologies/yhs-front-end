import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';


export const getCorporateListRedux: any = createAsyncThunk(
    'redux/corpList',
    async (dispatch: any, getState) => {
        const userData = useLocalStorage("get", "session", "user");
        const token = userData.data.token;
        const {limit, page, queryParams} = dispatch;
        const response = await api.get(`/corp/getAll?limit=${limit}&page=${page}`, {
            headers: { 'x-access-token': token },
        });
        return response.data;
    }
)

const corpListSlice = createSlice({
    name: 'contactList',
    initialState: {
      result: [],
      status: null,
    },
    reducers: {},
    extraReducers: {
      [getCorporateListRedux.pending]: (
        state: any,
        action: PayloadAction<string>
      ) => {
        state.status = 'loading';
      },
      [getCorporateListRedux.fulfilled]: (
        state: any,
        action: PayloadAction<string>
      ) => {
        state.status = 'success';
        state.result = action.payload;
      },
      [getCorporateListRedux.rejected]: (
        state: any,
        action: PayloadAction<string>
      ) => {
        state.status = 'failed';
      },
    },
});

export default corpListSlice.reducer;
