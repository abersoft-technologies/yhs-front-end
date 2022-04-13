import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRouter } from 'next/router';

export const getEdu = async (id: string | string[] | undefined) => {
  const userData = useLocalStorage('get', 'session', 'user');
  const token = userData.data.token;
  try {
    const result = await api.get(`/edu/get?id=${id}`, {
      headers: { 'x-access-token': token },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};