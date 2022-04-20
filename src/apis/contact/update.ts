import api from '../api';
import { IContactSchema } from '../../types/global';

export const updateContact = async (
  id: string | string[] | undefined,
  data: any
) => {
  try {
    const result = await api.put(`/contact/${id}`, data);
    return result;
  } catch (err) {
    console.error(err);
  }
};
