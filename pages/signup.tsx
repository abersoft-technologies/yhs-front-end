import type { NextPage } from 'next'
import React, { useState } from 'react';
import { Flex } from '../src/components/ui/Flex';
import Layout from '../src/layout/layout';
import styles from "../styles/loginSignup.module.scss"


const Signup: NextPage = () => {
    const [userName, setUserName] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordTwo, setPasswordTwo] = useState<string>("");

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("EMAIL: ", email, "password", password, "password two", passwordTwo, "username", userName, "name", name)
        setUserName("");
        setPassword("");
        setName("");
        setEmail("");
        setPasswordTwo("");
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       if(e.target.id === "input-username") setUserName(e.target.value);
       if(e.target.id === "input-password") setPassword(e.target.value);
       if(e.target.id === "input-name") setName(e.target.value);
       if(e.target.id === "input-password-again") setPasswordTwo(e.target.value);
       if(e.target.id === "input-email") setEmail(e.target.value);
    }

    return (
        <Layout doNotShowSidebar={true}>
            <form action="get" onSubmit={e => onFormSubmit(e)} className={styles.container}>
                <Flex direction='column' gap='small' align='flex-start' justify='center'>
                    <label htmlFor='username'>Användarnam:</label>
                    <input type="text" name="username" id="input-username" onChange={e => onTextChange(e)} value={userName} />
                    <label htmlFor='name'>Namn:</label>
                    <input type="text" name="name" id="input-name" onChange={e => onTextChange(e)} value={name} />
                    <label htmlFor='email'>Email:</label>
                    <input type="email" name="email" id="input-email" onChange={e => onTextChange(e)} value={email} />
                    <label htmlFor='password'>Lösenord:</label>
                    <input type="password" name="password" id="input-password" onChange={e => onTextChange(e)} value={password} />
                    <label htmlFor='password-again'>Lösenord:</label>
                    <input type="password" name="password-again" id="input-password-again" onChange={e => onTextChange(e)} value={passwordTwo} />
                    <button>SUBMIT</button>
                </Flex>
            </form>
        </Layout>
    )
}

export default Signup;