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
        title: 'Discrete Structures',
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
        title: 'Computer Organisation',
        moduleCode: 'CS2100'
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
    case actions.UPDATE_TASKLIST_SYNC: {
      return {
        ...state,
        tasks: state.tasks.map((t, i) => t.id === state.currentTask.id ? state.currentTask : t),
      }
    }
    case actions.TOGGLE_COMPLETE: {
      const { id } = action.payload;
      if (state.currentTask && id === state.currentTask.id)
        return {
          ...state,
          tasks: state.tasks.map((t, i) => t.id === id ? { ...t, complete: !t.complete } : t),
          currentTask: {
            ...state.currentTask,
            complete: !state.currentTask.complete
          }
        }
      else return {
        ...state,
        tasks: state.tasks.map((t, i) => t.id == id ? { ...t, complete: !t.complete } : t),
      }
    }
    case actions.SELECT_TASK: {
      const { task } = action.payload;
      return {
        ...state,
        currentTask: { ...task, saved: true }
      }
    }
    case actions.QUICK_ADD_TODAY: {
      const { newTask } = action.payload;
      return {
        ...state,
        tasks: [...state.tasks, newTask]
      }
    }
    default: {
      return state
    }
  }
}

export default reducer;