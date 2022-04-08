export interface IUserModel {
  user: {
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
