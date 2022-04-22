import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { combineReducers } from 'redux';
import userReducer from './slice/userSlice';
import contactListReducer from './slice/contactList';
import corpListReducer from './slice/corpList';
import corporateReducer from './slice/corporate';
import contactReducer from './slice/contact';
import letterReducer from './slice/letter';
import infoBoxReducer from './slice/infoBox';

import eduListReducer from './slice/eduList';
import searchQueryReducer from './slice/searchQuery';
import filterQueryReducer from './slice/filterQuery';
import filterOptionsReducer from './slice/filterOptions';
import lettersDataReducer from './slice/lettersData';

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
  contactReducer,
  letterReducer,
  infoBoxReducer,
  lettersDataReducer,
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
