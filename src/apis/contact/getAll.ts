import { useLocalStorage } from "../../hooks/useLocalStorage";
import api from "../api";

export const getAll = async () => {
    try {
      const result = await api.get(`/contact?limit=${0}&page=${10}`);
      return result;
    } catch (err) {
      console.error(err);
    }
};