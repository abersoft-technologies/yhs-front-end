import api from '../../api';

export const getLetter = async (id: { _id: string }) => {
  try {
    const result = await api.get(`/letter/${id}`);
    return result;
  } catch (err) {
    console.error(err);
  }
};
