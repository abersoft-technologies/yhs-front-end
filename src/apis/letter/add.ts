import api from "../api";

interface ILetterOfIntent {
    edu: string[];
    employment: string;
    internship: string;
    readEdu: boolean;
    contributeEdu: boolean;
    lecture: boolean;
    studyVisit: boolean;
    eduBoard: boolean;
  }

export const addLetter = async (data: ILetterOfIntent) => {
    try {
      const result = await api.post("/letter", data);
      return result;
    } catch (err) {
      console.error(err);
    }
  };