import api from '../../api';

export const getLetter = async (id: string | string[] | undefined) => {
  try {
    const result = await api.get(`/letter/${id}`);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getData = async () => {
  try {
    const result = await api.get("/letter/data");
    return result;
  } catch (err) {
    console.error(err);
  }
};