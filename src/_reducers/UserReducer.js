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
      const { user_id, sub_id, email, first_name, last_name } = action.payload;
      return {
        ...state,
        userId: user_id,
        subId: sub_id,
        email: email,
        firstName: first_name,
        lastName: last_name,
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