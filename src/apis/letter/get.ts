import { useLocalStorage } from "../../hooks/useLocalStorage";
import api from "../api";

export const getLetters = async (edu: string | string[] | undefined) => {
    const userData = useLocalStorage('get', 'session', 'user');
    const token = userData.data.token;
    try {
      const result = await api.get(`/letter?queryParams=${edu}`, {
        headers: { 'x-access-token': token },
      });
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  export const getAllLetters = async () => {
    try {
      const result = await api.get("/letter");
      return result;
    } catch (err) {
      console.error(err);
    }
  };