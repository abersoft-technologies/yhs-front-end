import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Redirect } from '../src/globalFunctions/redirect';
import { useLocalStorage } from '../src/hooks/useLocalStorage';

// REDUX STUFF
import { store } from '../src/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

/* Styles imports */
import '../styles/globals.scss';
import '../styles/ui/flex.scss';

/* Components import */
import Layout from '../src/layout/layout';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  /*   if (router.pathname === '/*') {
    Redirect('/inloggning');
  } */
  useEffect(() => {
    const user = useLocalStorage('get', 'session', 'user');
    if (!user && router.pathname !== '/registrering') {
      Redirect('/inloggning');
    }
  }, [router.pathname]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
