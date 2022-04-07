import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';


export const getEduListRedux: any = createAsyncThunk(
    'redux/eduList',
    async (dispatch: any, getState) => {
        const userData = useLocalStorage("get", "session", "user");
        const token = userData.data.token;
        const {limit, page, queryParams} = dispatch;
        const response = await api.get(`/edu/getAll?limit=${limit}&page=${page}&queryParams=${queryParams}`, {
            headers: { 'x-access-token': token },
        });
        return response.data;
    }
)

const eduListSlice = createSlice({
    name: 'contactList',
    initialState: {
      result: [],
      status: null,
    },
    reducers: {},
    extraReducers: {
      [getEduListRedux.pending]: (
        state: any,
        action: PayloadAction<string>
      ) => {
        state.status = 'loading';
      },
      [getEduListRedux.fulfilled]: (
        state: any,
        action: PayloadAction<string>
      ) => {
        state.status = 'success';
        state.result = action.payload;
      },
      [getEduListRedux.rejected]: (
        state: any,
        action: PayloadAction<string>
      ) => {
        state.status = 'failed';
      },
    },
});

export default eduListSlice.reducer;
