export const lightTheme = {
  palette: {
    type: 'light',
    primary: {
      main: '#7134EB',
    },
    secondary: {
      main: '#26a69a',
    },
    error: {
      main: '#FA2222',
    },
  },
  typography: {
    fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
    fontSize: 14,
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiAppBar: {
      color: 'transparent',
    },
    MuiButtonBase: {
      disableRipple: true,
    },
  },
};