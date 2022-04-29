import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from '../src/globalFunctions/redirect';
import { add } from '../src/store/slice/userSlice';
import { addOrg } from '../src/apis/org/add';
import { useAppDispatch } from '../src/hooks/useStore';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import { useWindowSize } from '../src/hooks/useWindowSize';
import { Loading } from '../src/components/ui/loading/Loading';
import { useDispatch } from 'react-redux';
import { IUserModelRedux } from '../src/types/global';
import uniqid from 'uniqid';


/* Styles import */
import styles from '../styles/loginSignup.module.scss';

/* Components import */
import { Flex } from '../src/components/ui/Flex';
import { Input } from '../src/components/ui/form/input/Input';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  id: string;
  orgId?: number;
}

const Organisation: NextPage = () => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const [org, setOrg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitToDB();
    setOrg('');
  };

  /*   const reqUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/auth/login'
      : 'https://yhs-back-end.herokuapp.com/auth/login'; */
  const reqUrl = 'https://yhs-back-end.herokuapp.com/auth/signup';

  const submitToDB = async () => {
    const id = uniqid();
    const userData = localStorage.getItem("regData");
    if(userData) {
      const data: IUser = {
        ...JSON.parse(userData),
        orgId: id,
      };
      const userList: Array<IUser> = [data]
      const orgData = {
        name: org,
        orgId: id,
        users: userList
      }
      setIsLoading(true);
      axios
      .post(reqUrl, data)
      .then((res) => {
        const data = res.data;
        dispatch(add(res.data))
        sessionStorage.setItem("user", JSON.stringify(data))
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
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
      await addOrg(orgData)
      .then(res => {
        console.log(res?.data)
        setTimeout(() => {
          setIsLoading(false);
          Redirect("/")
        }, 3000);
      })
      .catch(err => console.log(err))
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrg(e.currentTarget.value)
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
              name='org'
              value={org}
              label='Organisationsnamn'
              placeholder='Organisationsnamn'
              onChangeFunction={(e) => onTextChange(e)}
              width='300px'
            />
            <button>Skapa konto</button>
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

export default Organisation;
