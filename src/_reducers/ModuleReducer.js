import { actions } from '../utils/constants/actions';

const initState = {
  allModules: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOAD_ALL_MODULES: {
      const { allModules } = action.payload;
      return {
        ...state,
        allModules
      }
    }
    default: {
      return state
    }
  }
}

export default reducer;