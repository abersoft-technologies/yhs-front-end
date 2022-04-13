import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const getFilterOptions: any = createAsyncThunk(
  'redux/filterOptions',
  async (dispatch: any, getState) => {
    const userData = useLocalStorage('get', 'session', 'user');
    const token = userData.data.token;
    const townsResult = await api.get(`/options/select/towns`, {
      headers: { 'x-access-token': token },
    });
    const educationsResult = await api.get(`/options/select/educations`, {
      headers: { 'x-access-token': token },
    });
    let towns, educations;
    if (townsResult.status === 200) {
      towns = townsResult.data;
    }
    if (educationsResult.status === 200) {
      educations = educationsResult.data;
    }

    return { towns, educations };
  }
);
interface IfilterOptionsState {
  result: {
    towns: {
      data: [{ value: string; label: string }] | [];
      status: number | null;
      message: string;
    };
    educations: {
      data: [{ value: string; label: string }] | [];
      status: number | null;
      message: string;
    };
  };
  status: string | null;
}
const initialState: IfilterOptionsState = {
  result: {
    towns: {
      data: [],
      status: null,
      message: '',
    },
    educations: {
      data: [],
      status: null,
      message: '',
    },
  },
  status: null,
};

const filterOptionsSlice = createSlice({
  name: 'filterOptions',
  initialState,
  reducers: {},
  extraReducers: {
    [getFilterOptions.pending]: (state: any, action: PayloadAction<string>) => {
      state.status = 'loading';
    },
    [getFilterOptions.fulfilled]: (
      state: any,
      action: PayloadAction<string>
    ) => {
      state.status = 'success';
      state.result = action.payload;
    },
    [getFilterOptions.rejected]: (
      state: any,
      action: PayloadAction<string>
    ) => {
      state.status = 'failed';
    },
  },
});

export default filterOptionsSlice.reducer;
