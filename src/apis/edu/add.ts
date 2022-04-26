import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface IAddCorpParams {
  name: string;
  place: string;
  shortName: string;
  type: string;
}

export const addEdu = async (data: IAddCorpParams) => {
  try {
    const result = await api.post(`/edu/add`, data);
    return result;
  } catch (err) {
    console.error(err);
  }
};
