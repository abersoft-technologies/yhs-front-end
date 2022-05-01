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
        orgId?: number;
      };
    };
    message: string;
  };
}

export interface IEducationSchema {
  managementList: Array<string>;
  name: string;
  place: string;
  shortName: string;
  type: string;
  goal?: {
    letters: number,
    employements: number,
    internships: number,
  }
}

export interface ILetterSchema {
  _id?: string;
  edu: string[];
  employment: string;
  internship: string;
  readEdu: boolean;
  contributeEdu: boolean;
  lecture: boolean;
  studyVisit: boolean;
  eduBoard: boolean;
}

export interface IContactSchema {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  company: string;
  role?: string;
  town?: string;
  status: string;
  letterOfIntent?: {
    edu: string[];
    employment: string;
    internship: string;
    readEdu: boolean;
    contributeEdu: boolean;
    lecture: boolean;
    studyVisit: boolean;
    eduBoard: boolean;
  };
  letters: [{ _id: string }] | undefined;
}

export interface eduLettersData {
  education: {
    _id: string;
    name: string;
    shortName: string;
    place: string;
    managmentlist: [];
    type: string;
    __v: number;
  };
  totalDataEdu: {
    totalLetters: number;
    employment: {
      low: number;
      high: number;
    };
    internship: number;
    readEdu: number;
    contributeEdu: number;
    lecture: number;
    studyVisit: number;
    eduBoard: number;
  };
  letters: ILetterSchema[];
}
