import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface IAddEduParams {
  name: string;
  place: string;
  shortName: string;
  type: string;
  orgId: string;
}

export const addEdu = async (data: IAddEduParams) => {
  try {
    const result = await api.post(`/edu/add`, data);
    return result;
  } catch (err) {
    console.error(err);
  }
};
