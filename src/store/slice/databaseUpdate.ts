import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUserModelRedux } from '../../types/global';

interface StateObject {
    number: number,
    // showBox: boolean;
}

const initialState: StateObject = {
    number: 0
    // showBox: false,
};

export const databaseUpdateSlice = createSlice({
  name: 'infoBox',
  initialState,
  reducers: {
    update: (state: StateObject) => {
        state.number += 1;

        // setTimeout(() => {
        //     state = {infoText: "", showBox: false, time: 0, type: undefined}
        // }, action.payload.time);
    },
    getNumber: (state: StateObject) => {
        return state;
    }
  },
});

export const { update, getNumber } = databaseUpdateSlice.actions;

export default databaseUpdateSlice.reducer;
