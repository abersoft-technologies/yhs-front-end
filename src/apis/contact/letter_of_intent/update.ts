import api from '../../api';

interface ILetOfIntent {
  edu: string[];
  employment: string;
  internship: string;
  readEdu: boolean;
  contributeEdu: boolean;
  lecture: boolean;
  studyVisit: boolean;
  eduBoard: boolean;
}

export const updateLetOfIntent = async (
  id: { _id: string },
  data: ILetOfIntent
) => {
  console.log(data, id);
  try {
    const result = await api.put(`/letter/${id}`, data);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
