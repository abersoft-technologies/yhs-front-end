import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRouter } from 'next/router';

export const getCorp = async (id: string | string[] | undefined) => {
  const userData = useLocalStorage('get', 'session', 'user');
  const token = userData.data.token;
  try {
    const result = await api.get(`/corp/get?id=${id}`, {
      headers: { 'x-access-token': token },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getContactsInCorp = async (corporate: string | string[] | undefined) => {
    const userData = useLocalStorage('get', 'session', 'user');
    const token = userData.data.token;
    try {
      const result = await api.get(`/corp/getContacts?corporate=${corporate}`, {
        headers: { 'x-access-token': token },
      });
      return result;
    } catch (err) {
      console.error(err);
    }
  };
