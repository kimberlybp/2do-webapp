import { actions } from "../utils/constants/actions";

const initState = {
  access_token: null,
  signUpSuccess: null
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_TOKEN: {
      const { access_token } = action.payload;
      return {
        ...state,
        access_token: access_token
      }
    }
    case actions.RESET_APP: {
      return initState;
    }
    case actions.LOG_OUT_AUTH: {
      return initState;
    }
    case actions.SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpStatus: true
      }
    }
    case actions.CLEAR_SIGN_UP_STATUS: {
      return {
        ...state,
        signUpStatus: null
      }
    }
    default: {
      return state
    }
  }
}

export default reducer;