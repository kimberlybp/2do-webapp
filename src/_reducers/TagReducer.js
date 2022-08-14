import { actions } from "../utils/constants/actions";

const initState = {
  tags: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.CREATE_TAG: {
      const { newTag } = action.payload;
      return {
        ...state,
        tags: [
          ...state.tags,
          newTag
        ]
      }
    }
    case actions.SET_INIT_TAGS: {
      const { tags } = action.payload;
      return {
        ...state,
        tags: tags
      }
    }
    default: {
      return state
    }
  }
}

export default reducer;