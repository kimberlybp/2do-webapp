import { actions } from '../utils/constants/actions';

// const initState = {
//   currentTask: null,
//   tasks: null
// }
const initState = {
  currentTask: null,
  tasks: [
    {
      id: 1,
      taskList: { name: 'School' },
      title: "Finish and Submit Lab 4",
      description: "",
      complete: false,
      subtasks: [
        {order: 1, title: "Review lecture first", complete: false},
        {order: 2, title: "Ask prof about topic 8", complete: false},
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
      taskList: { name: 'Work' },
      title: "Create a Pull Request for Feature #10",
      description: "",
      complete: false,
      subtasks: [
        {order: 1, title: "Ask about API", complete: false}
      ],
      tags: [
        {tagId: 2, name: "Medium", color: "#FFA500"}
      ],
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      module: null,
      saved: true
    }
  ]
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.RESET_APP: {
      return initState;
    }
    case actions.CREATE_TASK_DIALOG: {
      return {
        ...state,
        currentTask: {
          id: state.tasks[state.tasks.length-1].id + 1,
          taskList: { name: 'School' },
          title: "Task Title",
          description: "",
          complete: false,
          subtasks: [
            {order: 1, title: "Subtask 1", complete: false},
          ],
          tags: [
            {tagId: 1, name: "High", color: "#FA2222"}
          ],
          dueDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          module:null,
          create: true
        }
      }
    }
    case actions.SET_INIT_TASKS: {
      const { tasks } = action.payload;
      return {
        ...state,
        tasks: tasks
      }
    }
    case actions.CREATE_TASK: {
      return {
        ...state,
        currentTask: {
          ...state.currentTask,
          create: false
        },
        tasks: [...state.tasks, {
          ...state.currentTask,
          create: false
        }]
      }
    }
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
        tasks: state.tasks.map((t, i) => t.id === id ? { ...t, complete: !t.complete } : t),
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