import axios from 'axios';
const API = 'https://yhs-back-end.herokuapp.com/';

const api = axios.create({
  baseURL: 'https://yhs-back-end.herokuapp.com',
  timeout: 20000,
});

api.interceptors.request.use(
  (config: any) => {
    let token;
    token = localStorage.getItem('accessToken');
    localStorage.getItem('accessToken');

    console.log(token);

    if (token) {
      config.headers['x-access-token'] = token;
      config.headers['Content-Type'] = 'application/json';
      return config;
    }
    return config;
  },
  (error) => {
    console.log('Reacing error');
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === `${API}refresh`
    ) {
      localStorage.clear();
      sessionStorage.clear();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      const user: any = sessionStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      const email = parsedUser.data.user.email;

      return axios
        .post(`${API}refresh`, { email, refreshToken })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('accessToken', res.data.accessToken);
            axios.defaults.headers.common['x-access-token'] =
              res.data.accessToken;

            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default api;
