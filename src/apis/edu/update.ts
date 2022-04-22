import api from '../api';

export const updateEdu = async (
  id: string | string[] | undefined,
  data: any
) => {
  try {
    const result = await api.put(`edu/${id}`, data);
    return result;
  } catch (err) {
    console.error(err);
  }
};
