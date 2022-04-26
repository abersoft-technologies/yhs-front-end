import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';


export const getCorporateListRedux: any = createAsyncThunk(
    'redux/corpList',
    async (dispatch: any, getState) => {
        const {limit, page, queryParams, filterQuery} = dispatch;
        const filterParams = new URLSearchParams(filterQuery).toString();
        const response = await api.get(`/corp/getAll?limit=${limit}&page=${page}&queryParams=${queryParams}&${filterParams}`);
        return response.data;
    }
)

const corpListSlice = createSlice({
    name: 'contactList',
    initialState: {
      result: [],
      status: null,
    },
    reducers: {
      add: (state, action: any) => {
        state = action.payload;
      }
    },
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
export const { add } = corpListSlice.actions;

export default corpListSlice.reducer;
