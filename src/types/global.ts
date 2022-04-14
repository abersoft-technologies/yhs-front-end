export interface IUserModelRedux {
  data: {
    status: number | null;
    data: {
      token: string;
      user: {
        firstName: string;
        lastName: string;
        email: string;
        date: string;
        id: string;
      };
    };
    message: string;
  };
}

export interface IContactSchema {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  company: string;
  role?: string;
  town?: string;
  status: string;
  letterOfIntent: {
    edu: string[];
    employment: string;
    internship: string;
    readEdu: boolean;
    contributeEdu: boolean;
    lecture: boolean;
    studyVisit: boolean;
    eduBoard: boolean;
  };
}
