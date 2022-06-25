import { actions } from '../utils/constants/actions';

const initState = {
  userId: null,
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
    case actions.LOG_OUT_USER: {
      return initState;
    }
    default: {
      return state
    }
  }
}

export default reducer;