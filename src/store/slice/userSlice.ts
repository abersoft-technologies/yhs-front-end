import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUserModel } from "../../types/global"

export type UserState = {
    value: IUserModel;
}

const initialState: UserState = {
    value: {
        name: "",
        username: "",
        email: "",
        password: "",
        date: ""
    },
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<IUserModel>) => {
            state.value = {...action.payload};
        }
    }
});

export const {
    add
} = userSlice.actions;

export const SelectCurrentUser = (state: RootState) => state.userReducer.value;

export default userSlice.reducer;

