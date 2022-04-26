import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';


export const getEduListRedux: any = createAsyncThunk(
    'redux/eduList',
    async (dispatch: any, getState) => {
        const {limit, page, queryParams, filterQuery} = dispatch;
        const filterParams = new URLSearchParams(filterQuery).toString();
        const response = await api.get(`/edu/getAll?limit=${limit}&page=${page}&queryParams=${queryParams}&${filterParams}`);
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
