import { ILetterSchema } from '../../types/global';
import api from '../api';

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
  try {
    const result = await api.post(`/contact`, data);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const addLetter = async (data: ILetterSchema) => {
  try {
    const result = await api.post('/letter', data);
    return result;
  } catch (err) {
    console.error(err);
  }
};
