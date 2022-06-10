import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { THEME } from "./assets/theme";
import store from './store';

import Loader from './components/Loader';
import Login from "./views/Login";
import { Search } from './views/Login/Search';
import CreateTaskModal from './views/Login/Modal';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={THEME}>
        <CssBaseline />
        <Loader />
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/search" element={<Search/>} />
            <Route path="/createtask" element={<CreateTaskModal/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
