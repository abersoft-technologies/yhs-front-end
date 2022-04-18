import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface IAddCorpParams {
  name: string;
  place: string;
  shortName: string;
  type: string;
}

export const addEdu = async (data: IAddCorpParams) => {
  const userData = useLocalStorage('get', 'session', 'user');
  const token = userData.data.token;
  try {
    const result = await api.post(`/edu/add`, data, {
      headers: { 'x-access-token': token },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};
