import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define the initial state using that type
const initialState = {
  value: '',
};

export const searchSlice = createSlice({
  name: 'searchQuery',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    removeQuery: (state) => {
      state.value = '';
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setQuery, removeQuery } = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const SelectSearchQuery = (state: RootState) =>
  state.searchQueryReducer.value;

export default searchSlice.reducer;
