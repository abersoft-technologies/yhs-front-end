import axios from 'axios';

interface dataLogin {
  email: string;
  password: string;
}

export const handleLogin = async (data: dataLogin) => {
  try {
    const user = await axios.post(
      `https://yhs-back-end.herokuapp.com/auth/login`,
      data
    );
    return user;
  } catch (error) {
    return error;
  }

  //   return user;
};
