export const lightTheme = {
  palette: {
    type: 'light',
    background: {
      default: '#d1bde1',
    },
    primary: {
      main: '#7134EB',
      dark: '#5D2AC2'
    },
    secondary: {
      main: '#26a69a',
    },
    error: {
      main: '#FA2222',
    },
    primary_grey_variant: {
      main: '#7B688A'
    }
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
      fontWeight: 600,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 800,
    },
    fontSize: 14,
    button: {
      textTransform: "none",
      fontWeight: 800,
      fontSize: 20
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: 700
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '8px !important'
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          fontSize: 16,
          fontWeight: 700,
          color: '#4610B1'
        }
      }
    },
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