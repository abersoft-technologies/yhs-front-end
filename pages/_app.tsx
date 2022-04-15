import { useEffect, ReactElement, ReactNode } from 'react';
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

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const user = useLocalStorage('get', 'session', 'user');
    if (!user && router.pathname !== '/registrering') {
      Redirect('/inloggning');
    }
  }, [router.pathname]);
  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}

export default MyApp;
