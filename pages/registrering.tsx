import React, { useState } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import { Redirect } from '../src/globalFunctions/redirect';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import { useWindowSize } from '../src/hooks/useWindowSize';
import { Loading } from '../src/components/ui/loading/Loading';

/* Styles import */
import styles from '../styles/loginSignup.module.scss';

/* Components import */
import { Flex } from '../src/components/ui/Flex';
import { Input } from '../src/components/ui/form/input/Input';

const Signup: NextPage = () => {
  const windowSize = useWindowSize();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordTwo, setPasswordTwo] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const reqUrl =
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:8080/auth/signup'
  //     : 'https://yhs-back-end.herokuapp.com/auth/signup';
  const reqUrl = 'https://yhs-back-end.herokuapp.com/auth/signup';
      //Minimum eight characters, at least one letter and one number
  const passwordRegex = /\d/;

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      setShowErrorMessage(true);
      return;
    }
    submitToDB();

    setFirstName('');
    setLastName('');
    setPassword('');
    setPasswordTwo('');
    setEmail('');
  };

  const validate = (): boolean => {
    const hasNumber = passwordRegex.test(password);
    if (password !== passwordTwo) {
      setErrorMessage('Lösenorden matchar inte');
      setPassword('');
      setPasswordTwo('');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return false;
    } else if (password.length < 8) {
      setErrorMessage(
        `Lösenordet är för kort, det är ${password.length} tecken och ska vara minst åtta tecken`
      );
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return false;
    } else if (!hasNumber) {
      setErrorMessage('Lösenordet måste innehålla minst ett nummer');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return false;
    }
    return true;
  };

  const submitToDB = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    setIsLoading(true);
    axios
      .post(reqUrl, data)
      .then((res) => {
        Redirect('/');
        useLocalStorage('set', 'session', 'user', JSON.stringify(data));
      })
      .catch((err) => {
        setShowErrorMessage(true);
        setErrorMessage('Något gick fel');
        setTimeout(() => {
          setShowErrorMessage(false);
          setErrorMessage('');
          setIsLoading(false);
        }, 3000);
        console.error(err);
      });
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'first-name') setFirstName(e.target.value);
    if (e.target.id === 'last-name') setLastName(e.target.value);
    if (e.target.id === 'password') setPassword(e.target.value);
    if (e.target.id === 'password-repeat') setPasswordTwo(e.target.value);
    if (e.target.id === 'email') setEmail(e.target.value);
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
            <h2>Skapa konto</h2>
            <Input
              type='text'
              name='first-name'
              value={firstName}
              label='Förnamn'
              placeholder='Förnamn'
              onChangeFunction={(e) => onTextChange(e)}
            />
            <Input
              type='text'
              name='last-name'
              value={lastName}
              label='Efternamn'
              placeholder='Efternamn'
              onChangeFunction={(e) => onTextChange(e)}
            />
            <Input
              type='email'
              name='email'
              value={email}
              label='Email'
              placeholder='Ex. exempel@exempel.se'
              onChangeFunction={(e) => onTextChange(e)}
            />
            <Input
              type='password'
              name='password'
              value={password}
              label='Lösenord'
              placeholder='Lösenord'
              onChangeFunction={(e) => onTextChange(e)}
            />
            <Input
              type='password'
              name='password-repeat'
              value={passwordTwo}
              label='Upprepa lösenord'
              placeholder='Upprepa ditt lösenord'
              onChangeFunction={(e) => onTextChange(e)}
            />
            <button>Registrera</button>
            <Flex direction='column' justify='center' align='center'>
              {showErrorMessage ? <p>{errorMessage}</p> : null}
              <Loading
                isLoading={isLoading && !showErrorMessage}
                size='small'
              />
            </Flex>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default Signup;
