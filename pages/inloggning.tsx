import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Redirect } from '../src/globalFunctions/redirect';
import { add } from '../src/store/slice/userSlice';
import { Loading } from '../src/components/ui/loading/Loading';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../src/apis/auth/auth';

/* Styles import */
import styles from '../styles/loginSignup.module.scss';

/* Components import */
import { Flex } from '../src/components/ui/Flex';
import { Input } from '../src/components/ui/form/input/Input';
import { Text } from '../src/components/ui/text/Text';

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const result: any = await handleLogin({ email, password });

    if (result.status === 200) {
      setPassword('');
      setEmail('');
      const userData = result.data.data;
      localStorage.setItem('accessToken', userData.accessToken);
      localStorage.setItem('refreshToken', userData.refreshToken);
      localStorage.setItem('orgId', userData.user.orgId);
      sessionStorage.setItem('user', JSON.stringify(userData));
      dispatch(add(userData));

      setTimeout(() => {
        Redirect('/');
      }, 1500);
    } else {
      setIsLoading(false);
      setErrorMessage('Ogiltiga uppgifter');
      setShowErrorMessage(true);
      setPassword('');
      setTimeout(() => {
        setErrorMessage('');
        setShowErrorMessage(false);
      }, 5000);
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'email') setEmail(e.target.value);
    if (e.target.id === 'password') setPassword(e.target.value);
  };

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
            <Flex direction='row' gap='small'>
              <Text text='Har du inget konto?' color='#363636' />

              <Link href='/registrering'>Registrera dig</Link>
            </Flex>
            {showErrorMessage && (
              <Flex
                direction='row'
                justify='center'
                class={styles.error_msg_container}
              >
                <p>{errorMessage}</p>
              </Flex>
            )}
            <Flex direction='row' justify='center'>
              <Loading isLoading={isLoading} size='small' />
            </Flex>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default Login;
