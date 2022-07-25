import { actions } from '../utils/constants/actions';

const initState = {
  isOpen: false
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.ALERT_SUCCESS: {
      const { title, message, autoHideDuration } = action.payload;
      return {
        isOpen: true,
        severity: 'success',
        title: title,
        message: message,
        autoHideDuration: autoHideDuration
      }
    }
    case actions.ALERT_ERROR: {
      const { title, message, autoHideDuration } = action.payload;
      return {
        isOpen: true,
        severity: 'error',
        title: title,
        message: message,
        autoHideDuration: autoHideDuration
      }
    }
    case actions.ALERT_WARNING: {
      const { title, message, autoHideDuration } = action.payload;
      return {
        isOpen: true,
        severity: 'warning',
        title: title,
        message: message,
        autoHideDuration: autoHideDuration
      }
    }
    case actions.ALERT_INFO: {
      const { title, message, autoHideDuration } = action.payload;
      return {
        isOpen: true,
        severity: 'info',
        title: title,
        message: message,
        autoHideDuration: autoHideDuration
      }
    }
    case actions.ALERT_CLOSE: {
      return {
        ...state,
        isOpen: false
      }
    }
    default: {
      return state
    }
  }
}

export default reducer;