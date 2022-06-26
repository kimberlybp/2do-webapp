import { actions } from '../utils/constants/actions';

const initState = {
  currentTask: null,
  tasks: [
    {
      id: 1,
      taskList: "School",
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
        moduleCode: 'CS1231S'
      },
      saved: true
    },
    {
      id: 2,
      taskList: "Work",
      title: "Finish and Submit 4 Tasks",
      description: "",
      complete: false,
      subtasks: [
        {order: 1, title: "subtask 1", complete: true},
        {order: 2, title: "subtask 2", complete: false}
      ],
      tags: [
        {tagId: 1, name: "High", color: "#000"}
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
  ]
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
    case actions.SELECT_TASK: {
      const { task } = action.payload;
      return {
        ...state,
        currentTask: { ...task, saved: true }
      }
    }
    default: {
      return state
    }
  }
}

export default reducer;