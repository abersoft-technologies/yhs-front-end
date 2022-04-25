import Router from 'next/router';
import { logout } from '../store/slice/userSlice';
import { store } from '../store/store';

export const logOutUser = () => {
  store.dispatch(logout());
  localStorage.clear();
  sessionStorage.clear();
  Router.push('/inloggning');
};
