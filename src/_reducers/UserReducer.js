import { actions } from '../utils/constants/actions';

const initState = {
  user_id: null,
  sub_id: null,
  email: null,
  logged_in: false
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_INIT_USER_INFO: {
      const { user_id, sub_id, email, first_name, last_name } = action.payload;
      return {
        ...state,
        user_id: user_id,
        sub_id: sub_id,
        email: email,
        first_name: first_name,
        last_name: last_name,
        logged_in: true
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