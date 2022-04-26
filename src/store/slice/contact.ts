import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../apis/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { IContactSchema } from '../../types/global';

export const getContactRedux: any = createAsyncThunk(
  'redux/contact',
  async (dispatch: any, getState) => {
    const response = await api.get(`/contact/get?id=${dispatch}`);
    if (response.status === 200) {
      return response.data.data.contact;
    } else {
      return response;
    }
  }
);
interface IContactState {
  result: IContactSchema;
  status: string | null;
}

const initialState: IContactState = {
  result: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    role: '',
    town: '',
    status: '',
    letterOfIntent: {
      edu: [],
      employment: '',
      internship: '',
      readEdu: false,
      contributeEdu: false,
      lecture: false,
      studyVisit: false,
      eduBoard: false,
    },
  },
  status: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: {
    [getContactRedux.pending]: (state: any, action: PayloadAction<string>) => {
      state.status = 'loading';
    },
    [getContactRedux.fulfilled]: (
      state: any,
      action: PayloadAction<string>
    ) => {
      state.status = 'success';
      state.result = action.payload;
    },
    [getContactRedux.rejected]: (state: any, action: PayloadAction<string>) => {
      state.status = 'failed';
    },
  },
});

export default contactSlice.reducer;
