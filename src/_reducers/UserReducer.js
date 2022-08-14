import { actions } from '../utils/constants/actions';

const initState = {
  userId: "init",
  subId: null,
  email: null,
  loggedIn: false
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_INIT_USER_INFO: {
      const { userId, subId, email, firstName, lastName } = action.payload;
      return {
        ...state,
        userId: userId,
        subId: subId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        loggedIn: true
      }
    }
    case actions.NO_USER_LOGGED_IN: {
      return {
        userId: null,
        subId: null,
        email: null,
        loggedIn: false
      }
    }
    case actions.RESET_APP: {
      return {
        userId: null,
        subId: null,
        email: null,
        loggedIn: false
      };
    }
    case actions.LOG_OUT_USER: {
      return {
        userId: null,
        subId: null,
        email: null,
        loggedIn: false
      };
    }
    default: {
      return state
    }
  }
}

export default reducer;