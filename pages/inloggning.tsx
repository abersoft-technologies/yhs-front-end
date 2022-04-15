import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from '../src/globalFunctions/redirect';
import { add } from '../src/store/slice/userSlice';
import { useAppDispatch } from '../src/hooks/useStore';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import { useWindowSize } from '../src/hooks/useWindowSize';
import { Loading } from '../src/components/ui/loading/Loading';
import { useDispatch } from 'react-redux';
import { IUserModelRedux } from '../src/types/global';

/* Styles import */
import styles from '../styles/loginSignup.module.scss';

/* Components import */
import { Flex } from '../src/components/ui/Flex';
import { Input } from '../src/components/ui/form/input/Input';

const Login: NextPage = () => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitToDB();
    setEmail('');
    setPassword('');
  };

  /*   const reqUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/auth/login'
      : 'https://yhs-back-end.herokuapp.com/auth/login'; */
  const reqUrl = 'https://yhs-back-end.herokuapp.com/auth/login';

  const submitToDB = () => {
    const data = {
      email: email,
      password: password,
    };
    setIsLoading(true);
    axios
      .post(reqUrl, data)
      .then((res) => {
        const data = res.data;
        console.log('JP userData', data);
        dispatch(add(data));
        useLocalStorage('set', 'session', 'user', JSON.stringify(data));
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        setTimeout(() => {
          Redirect('/');
        }, 1000);
      })
      .catch((err) => {
        setShowErrorMessage(true);
        setErrorMessage('Något gick fel');
        setTimeout(() => {
          setShowErrorMessage(false);
          setErrorMessage('');
        }, 3000);
        console.error(err);
      });
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'email') setEmail(e.target.value);
    if (e.target.id === 'password') setPassword(e.target.value);
  };

  useEffect(() => {
    useLocalStorage('remove', 'session', 'user');
  }, []);

  return (
    <div className={styles.registration_loggin_container}>
      <div className={styles.herosection_container}>
        <img
          src='/svgs/login_register/pattern-top-right.svg'
          alt='Pattern waves'
          className={styles.pattern_top_right}
        />
        <img
          src='/svgs/login_register/pattern-bottom-left.svg'
          alt='Pattern waves'
          className={styles.pattern_bottom_left}
        />

        <div className={styles.herosection_content_container}>
          <h1>Ett par klick från den perfekta ansökan!</h1>

          <img src='/svgs/login_register/charts-hero-image.svg' alt='Charts' />

          <div>
            <h3>Välkommen till ditt nya vertyg för yh-ansökan</h3>
            <p>Registrera dig och utforska dina mögligheter </p>
          </div>

          <Flex direction='row' align='center' gap='small'>
            <button>
              <img
                src='/svgs/login_register/chevron-herosection-register.svg'
                alt='Chevron'
              />
            </button>
            <Flex direction='row' gap='medium'>
              <span></span>
              <span></span>
              <span></span>
            </Flex>
            <button>
              <img
                src='/svgs/login_register/chevron-herosection-register.svg'
                alt='Chevron'
              />
            </button>
          </Flex>
        </div>
      </div>
      <div>
        <img src='/svgs/login_register/logo_loggin.svg' alt='Logo' />
        <form
          action='get'
          onSubmit={(e) => onFormSubmit(e)}
          className={styles.container_form}
        >
          <Flex direction='column' gap='medium' justify='center' width='auto'>
            <h2>Logga in</h2>

            <Input
              type='email'
              name='email'
              value={email}
              label='Email'
              placeholder='Email'
              onChangeFunction={(e) => onTextChange(e)}
              width='300px'
            />
            <Input
              type='password'
              name='password'
              value={password}
              label='Lösenord'
              placeholder='Lösenord'
              onChangeFunction={(e) => onTextChange(e)}
              width='300px'
            />

            <button>Logga in</button>
            <Flex direction='row' justify='center'>
              {showErrorMessage ? <p>{errorMessage}</p> : null}
              <Loading isLoading={isLoading} size='small' />
            </Flex>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default Login;
