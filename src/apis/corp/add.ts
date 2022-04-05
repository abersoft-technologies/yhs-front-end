import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface IAddCorpParams {
    name: string,
    tags: string[],
    info?: string,
}

export const addCorp = async (data: IAddCorpParams) => {
  const userData = useLocalStorage('get', 'session', 'user');
  const token = userData.data.token;
  try {
    const result = await api.post(`/corp/add`, data, {
      headers: { 'x-access-token': token },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};
