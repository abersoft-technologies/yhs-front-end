import { useLocalStorage } from "../../hooks/useLocalStorage";
import api from "../api";

export const getAll = async () => {
    const userData = useLocalStorage('get', 'session', 'user');
    const token = userData.data.token;
    try {
      const result = await api.get(`/contact?limit=${0}&page=${10}`, {
        headers: { 'x-access-token': token },
      });
      return result;
    } catch (err) {
      console.error(err);
    }
  };