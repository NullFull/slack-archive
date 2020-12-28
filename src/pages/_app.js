import React from 'react'
import { Provider } from 'next-auth/client'


const App = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
