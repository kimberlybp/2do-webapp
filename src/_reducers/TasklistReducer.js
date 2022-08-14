import { actions } from "../utils/constants/actions";

const initState = {
  tasklists: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.CREATE_TASKLIST: {
      const { newTasklist } = action.payload;
      return {
        ...state,
        tasklists: [
          ...state.tasklists,
          newTasklist
        ]
      }
    }
    case actions.SET_INIT_TASKLISTS: {
      const { tasklists } = action.payload;
      return {
        ...state,
        tasklists: tasklists
      }
    }
    default: {
      return state
    }
  }
}

export default reducer;