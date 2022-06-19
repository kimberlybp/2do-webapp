import { actions } from "../utils/constants/actions";

const initState = {
  access_token: null
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
    case actions.LOG_OUT_AUTH: {
      return initState;
    }
    default: {
      return state
    }
  }
}

export default reducer;