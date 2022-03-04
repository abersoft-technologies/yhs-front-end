import Head from "next/head"
import React from "react"
import styles from "../../styles/Layout.module.scss"

interface ILayoutProps {
    children: React.ReactNode;
}

export default function Layout({children}: ILayoutProps) {
    return (<>
     <Head>
        <title>YH-sökaren</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <main className={styles.main}>
            {children}
        </main>
    </>)
}