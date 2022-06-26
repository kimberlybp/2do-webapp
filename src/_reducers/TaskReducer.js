import { actions } from '../utils/constants/actions';

const initState = {
  currentTask: {
    taskListId: 1,
    title: "Finish and Submit Lab 4",
    description: "",
    complete: false,
    subtasks: [
      {order: 1, title: "subtask 1", complete: false},
      {order: 2, title: "subtask 2", complete: false}
    ],
    tags: [
      {tagId: 1, name: "High", color: "#FA2222"}
    ],
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    module: {
      title: '',
      moduleCode: ''
    },
    saved: true
  }
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.UPDATE_TASK_PARAM: {
      const { key, value } = action.payload;
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          [key]: value,
          saved: false
        }
      }
    }
    default: {
      return state
    }
  }
}

export default reducer;