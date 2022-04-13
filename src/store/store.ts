import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { combineReducers } from 'redux';
import userReducer from './slice/userSlice';
import contactListReducer from './slice/contactList';
import corpListReducer from './slice/corpList';
import corporateReducer from './slice/corporate';

import eduListReducer from './slice/eduList';
import searchQueryReducer from './slice/searchQuery';
import filterQueryReducer from './slice/filterQuery';
import filterOptionsReducer from './slice/filterOptions';

import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
const persistConfig = {
  key: 'root',
  storage: createWebStorage('local'),
};

const reducers = combineReducers({
  userReducer,
  contactListReducer,
  corpListReducer,
  eduListReducer,
  searchQueryReducer,
  filterQueryReducer,
  corporateReducer,
  filterOptionsReducer,
});

const persist = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persist,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
