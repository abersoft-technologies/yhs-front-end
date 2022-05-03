import axios from 'axios';
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Loading } from '../src/components/ui/loading/Loading';
import uniqid from 'uniqid';
import { useWindowSize } from '../src/hooks/useWindowSize';
import { add } from '../src/store/slice/userSlice';
import { useDispatch } from 'react-redux';
// import Link from 'next/link';

/* Styles import */
import styles from '../styles/loginSignup.module.scss';

/* Components import */
import { Flex } from '../src/components/ui/Flex';
import { Input } from '../src/components/ui/form/input/Input';
import { addOrg } from '../src/apis/org/add';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  orgId?: string;
}
import { Redirect } from '../src/globalFunctions/redirect';

const Signup: NextPage = () => {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordTwo, setPasswordTwo] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOrgForm, setShowOrgForm] = useState<boolean>(false);
  const [org, setOrg] = useState<string>('');

  const reqUrl = 'https://yhs-back-end.herokuapp.com/auth/signup';

  //Minimum eight characters, at least one letter and one number
  const passwordRegex = /\d/;

  const resetErrorMsg = () =>
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);

  const validate = (): boolean => {
    const hasNumber = passwordRegex.test(password);
    resetErrorMsg();

    if (!firstName || !lastName || !password || !passwordTwo || !email) {
      setErrorMessage('Fyll i alla fält');
      return false;
    }

    if (password !== passwordTwo) {
      setErrorMessage('Lösenorden matchar inte');
      setPassword('');
      setPasswordTwo('');
      return false;
    } else if (password.length < 8) {
      setErrorMessage(`Lösenordet måste vara minst åtta tecken`);
      return false;
    } else if (!hasNumber) {
      setErrorMessage('Lösenordet måste innehålla minst ett nummer');
      return false;
    }
    return true;
  };

  const onUserFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    setShowOrgForm(true);
  };

  const submitToDB = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = uniqid();
    const data: IUser = {
      firstName,
      email,
      lastName,
      password,
      orgId: id,
    };
    // const userList: Array<IUser> =
    const orgData = {
      name: org,
      orgId: id,
      users: [data],
    };
    console.log(orgData);
    setIsLoading(true);
    axios
      .post(reqUrl, data)
      .then((res: any) => {
        const data = res.data;
        dispatch(add(res.data));
        sessionStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('orgId', id);
      })
      .catch((err: any) => {
        setErrorMessage('Något gick fel');
        setTimeout(() => {
          setErrorMessage('');
          setIsLoading(false);
        }, 3000);
        console.error(err);
      });
    await addOrg(orgData)
      .then((res) => {
        console.log(res?.data);
        setTimeout(() => {
          setIsLoading(false);
          Redirect('/');
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'first-name') setFirstName(e.target.value);
    if (e.target.id === 'last-name') setLastName(e.target.value);
    if (e.target.id === 'password') setPassword(e.target.value);
    if (e.target.id === 'password-repeat') setPasswordTwo(e.target.value);
    if (e.target.id === 'email') setEmail(e.target.value);
    if (e.target.id === 'org') setOrg(e.target.value);
  };

  const userForm = (
    <form
      action='get'
      onSubmit={(e) => onUserFormSubmit(e)}
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
        <button>Nästa sida</button>

        {errorMessage && (
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
  );

  const orgForm = (
    <form
      action='get'
      onSubmit={(e) => submitToDB(e)}
      className={styles.container_form}
    >
      <Flex direction='column' gap='medium' justify='center' width='auto'>
        <h2>Skapa konto</h2>

        <Input
          type='text'
          name='org'
          value={org}
          label='Organisationsnamn'
          placeholder='Organisationsnamn'
          onChangeFunction={(e) => onTextChange(e)}
          width='300px'
        />
        <button>Skapa konto</button>

        {errorMessage && (
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
  );

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
        {windowSize.height && windowSize.height > 800 && (
          <img src='/svgs/login_register/logo_loggin.svg' alt='Logo' />
        )}
        {windowSize.height && windowSize.height < 800 && (
          <img
            src='/svgs/logos/logo_no_txt.svg'
            alt='Logo'
            className={styles.logo_reg_small_screen}
          />
        )}
        {showOrgForm ? orgForm : userForm}
      </div>
    </div>
  );
};

export default Signup;
