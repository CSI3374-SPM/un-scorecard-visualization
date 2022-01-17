// Apply global-styles to ALL pages (so don't put stupid stuff in it)
import '../../public/global-styles.css'

import React, {useEffect} from 'react';
import Head from 'next/head';

// Create app
const App = ({Component, pageProps}) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Scorecard Visualization</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
};

export default App;
