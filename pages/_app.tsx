import '../styles/globals.scss';
import '../styles/ui/flex.scss';
import type { AppProps } from 'next/app';
import Layout from '../src/layout/layout';
// REDUX STUFF
import { store } from '../src/store/store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
