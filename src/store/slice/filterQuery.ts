import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define the initial state using that type
interface IFilterQueryState {
  filterObj:
    | {
        status: string;
        town: string;
        edu: string;
        branchEdu: string,
        branchCorp: string,
        type: string,
        tags: string,
      }
    | {};
}
const initialState: IFilterQueryState = {
  filterObj: {
    status: '',
    town: '',
    edu: '',
    branchEdu: '',
    branchCorp: '',
    tags: '',
    type: ''
  },
};

export const filterQuerySlice = createSlice({
  name: 'filterQuery',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    removeFilterQuery: (state) => {
      state.filterObj = {};
    },
    setFilterQuery: (state, action: PayloadAction<IFilterQueryState>) => {
      return action.payload;
    },
  },
});

export const { setFilterQuery, removeFilterQuery } = filterQuerySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const SelectFilterQuery = (state: RootState) =>
  state.searchQueryReducer.value;

export default filterQuerySlice.reducer;
