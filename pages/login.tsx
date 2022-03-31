import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Flex } from '../src/components/ui/Flex';
import Layout from '../src/layout/layout';
import styles from '../styles/loginSignup.module.scss';
import axios from "axios";
import { Redirect } from '../src/globalFunctions/redirect';
import { add } from '../src/store/slice/userSlice';
import { IUserModel } from '../src/types/global';
import { useAppDispatch } from '../src/hooks/useStore';
import { useLocalStorage } from '../src/hooks/useLocalStorage';


const Login: NextPage = () => {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitToDB();
    setUserName('');
    setPassword('');
  };

  const reqUrl = "https://yhs-back-end.herokuapp.com/users/login";

  const submitToDB = () => {
    const data = {
      username: userName,
      password: password
    }
    axios.post(reqUrl, data).then(res => {
      const data = res.data;
      dispatch(add(data));
      useLocalStorage("set", "session", "user", JSON.stringify(data))
      setTimeout(() => {
        Redirect("/")
        //TODO Show loading spinner (YS-38)
      }, 500);
    }).catch(err => console.error(err))
  }

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'input-username') setUserName(e.target.value);
    if (e.target.id === 'input-password') setPassword(e.target.value);
  };

  React.useEffect(() => {
    useLocalStorage("remove", "session", "user")
  }, [])

  return (
    <form
      action='get'
      onSubmit={(e) => onFormSubmit(e)}
      className={styles.container}
    >
      <Flex
        direction='column'
        gap='small'
        align='flex-start'
        justify='center'
        height='screen'
      >
        <label htmlFor='username'>Användarnam:</label>
        <input
          type='text'
          name='username'
          id='input-username'
          onChange={(e) => onTextChange(e)}
          value={userName}
        />
        <label htmlFor='password'>Lösenord:</label>
        <input
          type='password'
          name='password'
          id='input-password'
          onChange={(e) => onTextChange(e)}
          value={password}
        />
        <button>SUBMIT</button>
      </Flex>
    </form>
  );
};

export default Login;
