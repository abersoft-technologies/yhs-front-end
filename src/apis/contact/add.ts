import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface IAddContactParams {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  company: string;
  role?: string;
  town?: string;
  status: string;
}

export const addContact = async (data: IAddContactParams) => {
  const userData = useLocalStorage('get', 'session', 'user');
  const token = userData.data.token;
  try {
    const result = await api.post(`/contact`, data, {
      headers: { 'x-access-token': token },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};
