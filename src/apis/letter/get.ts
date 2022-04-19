import { useLocalStorage } from "../../hooks/useLocalStorage";
import api from "../api";

export const getLetters = async () => {
    const userData = useLocalStorage('get', 'session', 'user');
    const token = userData.data.token;
    try {
      const result = await api.get("/letter", {
        headers: { 'x-access-token': token },
      });
      return result;
    } catch (err) {
      console.error(err);
    }
  };