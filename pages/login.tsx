import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Flex } from '../src/components/ui/Flex';
import Layout from '../src/layout/layout';
import styles from '../styles/loginSignup.module.scss';
import axios from "axios";
import { Redirect } from '../src/globalFunctions/redirect';


const Login: NextPage = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitToDB();
    setUserName('');
    setPassword('');
  };

  const reqUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080/users/login" : "";

  const submitToDB = () => {
    const data = {
      username: userName,
      password: password
    }
    axios.post(reqUrl, data).then(res => {
      console.log("RES -->", res)
      Redirect("/")
    }).catch(err => console.error(err))
  }

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'input-username') setUserName(e.target.value);
    if (e.target.id === 'input-password') setPassword(e.target.value);
  };

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
