import camelToSnakeCase from '../utils/camelToSnakeCase';
import { actions } from '../utils/constants/actions';
import { taskService } from '../_services/taskService';
import * as alertActions from './AlertAction';
import { stopPageLoading, taskLoading, taskLoadingDone } from './SharedAction';

function updateCurrentTask(key, value) {
  return {
    type: actions.UPDATE_TASK_PARAM, payload: { key, value }
  }
}

export function updateNewTask(key, value) {
  return {
    type: actions.UPDATE_NEW_TASK_PARAM, payload: { key, value }
  }
}

export function updateExistingTask(key, value) {
  return async (dispatch, getState) => { 
    dispatch(updateCurrentTask(key, value));
    dispatch(save());
    
    // try{
    //   const currentTask = getState().Task.currentTask;
    //   const toSend = {
    //     _id: currentTask.id,
    //     task_list: currentTask.tasklist,
    //     title: currentTask.title,
    //     description: currentTask.description,
    //     complete: currentTask.complete,
    //     subtasks: currentTask.subtasks,
    //     tags: currentTask.tags,
    //     due_date: currentTask.dueDate,
    //     module: currentTask.module
    //   };
    //   const res = await taskService.updateUserTask(toSend);
    //   console.log(res);

    // }catch (err) {
    //   dispatch(alertActions.errorAlert('Error', err.message, 30));
    //   dispatch(stopPageLoading());
    // }
  }
}

export function updateTaskParam(key, value, isNewTask) {
  return async (dispatch, getState) => { 
    if (isNewTask) {
      dispatch(updateNewTask(key, value));
    } else {
      dispatch(updateCurrentTask(key, value));
      dispatch(save());
    }
    

    // try{
    //   const currentTask = getState().Task.currentTask;
    //   const toSend = {
    //     _id: currentTask.id,
    //     task_list: currentTask.tasklist,
    //     title: currentTask.title,
    //     description: currentTask.description,
    //     complete: currentTask.complete,
    //     subtasks: currentTask.subtasks,
    //     tags: currentTask.tags,
    //     due_date: currentTask.dueDate,
    //     module: currentTask.module
    //   };
    //   const res = await taskService.updateUserTask(toSend);
    //   console.log(res);

    // }catch (err) {
    //   dispatch(alertActions.errorAlert('Error', err.message, 30));
    //   dispatch(stopPageLoading());
    // }
  }
}

export function save() {
  return {
    type: actions.UPDATE_TASKLIST_SYNC
  }
}

export function initCreateTask() {
  return {
    type: actions.CREATE_TASK_INIT
  }
}

export function selectTask(task) {
  return {
    type: actions.SELECT_TASK, payload: { task }
  }
}

// export function createTask() {
//   return {
//     type: actions.CREATE_TASK
//   }
// }

export function toggleComplete(id) {
  return {
    type: actions.TOGGLE_COMPLETE, payload: { id }
  }
}

export function quickAddToday(newTask) {
  return {
    type: actions.QUICK_ADD_TODAY, payload: { newTask }
  }
}

function setInitTasks(tasks) {
  return {
    type: actions.SET_INIT_TASKS, payload: { tasks }
  }
}

export function getTasks() {
  return async (dispatch, getState) => {
    const userId = getState().User.userId;
    try {
      const res = await taskService.getUserTasks(userId);
      const updated = await res.map((t) => ({
        id: t._id,
        tasklist: t.task_list,
        title: t.title,
        description: t.description,
        complete: t.complete,
        subtasks: t.subtasks,
        tags: t.tags,
        dueDate: t.due_date ? new Date(t.due_date) : null,
        createdAt: new Date(t.created_at),
        updatedAt: new Date(t.updated_at),
        module: t.module ? { title: t.module.title, moduleCode: t.module.module_code } : null
      }))
      dispatch(setInitTasks(updated));
    }catch (err) {
      dispatch(alertActions.errorAlert('Error', err.message, 30));
      dispatch(stopPageLoading());
    }
  }
}

export function createTask() {
  return async (dispatch, getState) => {
    const userId = getState().User.userId;
    const task = getState().Task.newTask;

    dispatch(taskLoading("createTask"))
    try {
      const processedTask = processNewTask(task, userId);
      const res = await taskService.createTask(processedTask);
      dispatch(getTasks());
      dispatch(taskLoadingDone("createTask"));
      dispatch(alertActions.successAlert('Success',
        "Task successfully created", 10));
      return res;
    } catch (err) {
      dispatch(alertActions.errorAlert('Error',
        "We're having trouble creating a new task for you. Please try again or contact us.", 15));
      dispatch(taskLoadingDone("createTask"));
    }
  }
}

function processNewTask(task, userId) {
  const processed = {};
  processed.user_id = userId;
  Object.keys(task).forEach(key => {
    if(key === "tasklist") {
      processed["task_list"] = task[key]._id;
    } else if(key === "tags") {
      const processedTags = task.tags.map(t => t._id);
      processed["tags"] = processedTags;
    } else if(key === "module" && task[key] !== null) { 
      processed["module"] = { title: task[key].title, module_code: task[key].moduleCode}
    } else {
      if(task[key] !== null) processed[camelToSnakeCase(key)] = task[key]
    }
  })
  return processed;
}

