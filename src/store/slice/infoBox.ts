import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUserModelRedux } from '../../types/global';

interface StateObject {
    infoText: string;
    time: number;
    type?: "warning" | "info" | "tip" | "success";
    showBox: boolean;
}

const initialState: StateObject = {
    infoText: "",
    time: 0,
    type: undefined,
    showBox: false,
};

export const infoBoxSlice = createSlice({
  name: 'infoBox',
  initialState,
  reducers: {
    showInfoBox: (state: StateObject, action: PayloadAction<StateObject>) => {
        return action.payload;

        // setTimeout(() => {
        //     state = {infoText: "", showBox: false, time: 0, type: undefined}
        // }, action.payload.time);
    },
  },
});

export const { showInfoBox } = infoBoxSlice.actions;

export default infoBoxSlice.reducer;
