import api from '../api';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRouter } from 'next/router';

export const getEdu = async (id: string | string[] | undefined) => {
  try {
    const result = await api.get(`/edu/get?id=${id}`);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getAll = async () => {
  try {
    const result = await api.get(`/edu/getAll?limit=${0}`);
    return result;
  } catch (err) {
    console.error(err);
  }
};