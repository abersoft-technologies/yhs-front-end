import api from '../api';

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    date: string;
    id: string;
    orgId?: number;
  }

interface IAddOrgParams {
    name: string;
    orgId: string;
    users: Array<IUser>;
}

export const addOrg = async (data: IAddOrgParams) => {
  try {
    const result = await api.post(`/org/add`, data);
    return result;
  } catch (err) {
    console.error(err);
  }
};
