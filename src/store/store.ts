import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from './slice/userSlice';
import contactListReducer from './slice/contactList';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  userReducer,
  contactListReducer,
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
