import '../styles/globals.scss';
import '../styles/ui/flex.scss';
import type { AppProps } from 'next/app';
import Layout from '../src/layout/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
