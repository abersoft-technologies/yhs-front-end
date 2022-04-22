import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';
import { eduLettersData } from '../../types/global';

export const getLettersDataRedux: any = createAsyncThunk(
  'redux/lettersData',
  async (dispatch: any, getState) => {
    const response = await api.get(`/letter/data`);
    let data;
    if (response.status === 200) {
      data = response.data.data;
    }
    return data;
  }
);

interface IState {
  result: eduLettersData[];
  status: null | string;
}

const initialState: IState = {
  result: [
    {
      education: {
        _id: '',
        name: '',
        shortName: '',
        place: '',
        managmentlist: [],
        type: '',
        __v: 0,
      },
      totalDataEdu: {
        totalLetters: 0,
        employment: {
          low: 0,
          high: 0,
        },
        internship: 0,
        readEdu: 0,
        contributeEdu: 0,
        lecture: 0,
        studyVisit: 0,
        eduBoard: 0,
      },
      letters: [],
    },
  ],
  status: null,
};

const lettersDataRedux = createSlice({
  name: 'lettersData',
  initialState,
  reducers: {},
  extraReducers: {
    [getLettersDataRedux.pending]: (
      state: any,
      action: PayloadAction<string>
    ) => {
      state.status = 'loading';
    },
    [getLettersDataRedux.fulfilled]: (
      state: any,
      action: PayloadAction<string>
    ) => {
      state.status = 'success';
      state.result = action.payload;
    },
    [getLettersDataRedux.rejected]: (
      state: any,
      action: PayloadAction<string>
    ) => {
      state.status = 'failed';
    },
  },
});

export default lettersDataRedux.reducer;
