import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRouter } from 'next/router';

export const getContact = async (id: string | string[] | undefined) => {
    try {
      const result = await api.get(`/contact/get?id=${id}`);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  export const getNewContacts = async () => {
    try {
      const result = await api.get('/contact/get/newContacts');
      return result;
    } catch (err) {
      console.error(err);
    }
  };

