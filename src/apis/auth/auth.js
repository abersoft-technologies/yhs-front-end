import axios from 'axios';

export const handleLogin = async (data) => {
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
