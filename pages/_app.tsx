import { useEffect, ReactElement, ReactNode, useState } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
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
import LoadingPage from '../src/components/ui/loading/LoadingPage';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const user = useLocalStorage('get', 'session', 'user');
  const [loadingUser, setLoadingUser] = useState(true);
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    if (
      router.pathname !== '/inloggning' &&
      router.pathname !== '/registrering' &&
      !user
    ) {
      setTimeout(() => {
        Redirect('/inloggning');
      }, 800);
    } else if (user) {
      setLoadingUser(false);
    }
  }, [router.pathname, user]);

  let persistor = persistStore(store);

  router.pathname !== '/inloggning' && router.pathname !== '/registrering';
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {loadingUser &&
        router.pathname !== '/inloggning' &&
        router.pathname !== '/registrering' ? (
          <LoadingPage />
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
