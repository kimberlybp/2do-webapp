import { Fragment, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { THEME } from "./assets/theme";
import store from './store';

import Alert from './components/Alert';
import Loader from './components/Loader';
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Today from "./views/Today";
import { checkSession } from './_actions/AuthAction';

const Components = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession());

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <Alert />
      <Loader />
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/today" element={<Today />} />
        </Routes>
      </Router>
    </Fragment>
  )
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={THEME}>
        <CssBaseline />
        <Components />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
