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
    }
}
