
import React, { useEffect } from 'react'
import Setup from './routes/setup'
import 'react-toastify/dist/ReactToastify.css';


import './App.scss'
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles'
import { create } from 'jss'
import extend from 'jss-plugin-extend'
import { ToastContainer } from "react-toastify";

import theme from './theme'
import { useHistory } from 'react-router-dom';
import { getNavigate } from './apiKit/method';
import Loader from './customComponents/loader';

const jss = create({
  plugins: [...jssPreset().plugins, extend()]
})
function App() {

  const history = useHistory(

  )
  useEffect(() => {

    getNavigate(history)
  }, [])

  return (
    <>
      <ToastContainer />
      <StylesProvider jss={jss}>

        <ThemeProvider theme={theme}>
          <div className="App">
            <Setup />

          </div>
        </ThemeProvider>
      </StylesProvider>
      <Loader />
    </>

  );
}

export default App;
