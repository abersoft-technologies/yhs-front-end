import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';

export const getLetterRedux: any = createAsyncThunk(
  'redux/letter',
  async (dispatch: any, getState) => {
    const response = await api.get(`/letter/${dispatch}`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      return response;
    }
  }
);
interface ILetterState {
  result: {
    edu: string[];
    employment: string;
    internship: string;
    readEdu: false;
    contributeEdu: boolean;
    lecture: boolean;
    studyVisit: boolean;
    eduBoard: boolean;
  };
  status: string | null;
}

const initialState: ILetterState = {
  result: {
    edu: [],
    employment: '',
    internship: '',
    readEdu: false,
    contributeEdu: false,
    lecture: false,
    studyVisit: false,
    eduBoard: false,
  },
  status: null,
};

const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {},
  extraReducers: {
    [getLetterRedux.pending]: (state: any, action: PayloadAction<string>) => {
      state.status = 'loading';
    },
    [getLetterRedux.fulfilled]: (state: any, action: PayloadAction<string>) => {
      state.status = 'success';
      state.result = action.payload;
    },
    [getLetterRedux.rejected]: (state: any, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.result = {
        edu: [],
        employment: '',
        internship: '',
        readEdu: false,
        contributeEdu: false,
        lecture: false,
        studyVisit: false,
        eduBoard: false,
      };
    },
  },
});

export default letterSlice.reducer;
