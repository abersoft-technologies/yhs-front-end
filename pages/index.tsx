import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../src/layout/layout'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <Layout>
      <div>
        <h1>YH-sökaren</h1>
      </div>
    </Layout>
  )
}

export default Home
