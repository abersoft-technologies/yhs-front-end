import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface IAddCorpParams {
    name: string,
    tags: string[],
    info?: string,
}

export const addCorp = async (data: IAddCorpParams) => {
  try {
    const result = await api.post(`/corp/add`, data);
    return result;
  } catch (err) {
    console.error(err);
  }
};
