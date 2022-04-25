import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRouter } from 'next/router';

export const getCorp = async (id: string | string[] | undefined) => {
  try {
    const result = await api.get(`/corp/get?id=${id}`);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getContactsInCorp = async (corporate: string | string[] | undefined) => {
    try {
      const result = await api.get(`/corp/getContacts?corporate=${corporate}`);
      return result;
    } catch (err) {
      console.error(err);
    }
  };
