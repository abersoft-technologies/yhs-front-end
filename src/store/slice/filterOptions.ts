import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const getFilterOptions: any = createAsyncThunk(
  'redux/filterOptions',
  async (dispatch: any, getState) => {
    const townsResult = await api.get(`/options/select/towns`);
    const educationsResult = await api.get(`/options/select/educations`);
    const tagsResult = await api.get(`/options/select/tags`);

    let towns, educations, tags;

    if (townsResult.status === 200) {
      towns = townsResult.data;
    }
    if (educationsResult.status === 200) {
      educations = educationsResult.data;
    }
    if (tagsResult.status === 200) {
      tags = tagsResult.data;
    }

    return { towns, educations, tags };
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
    tags: {
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
    tags: {
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
