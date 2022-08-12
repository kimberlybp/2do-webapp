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
    dispatch(taskLoading("updateTask"))
    //update redux store first
    dispatch(updateCurrentTask(key, value));
    dispatch(save());

    try {
      const currentTask = getState().Task.currentTask;
      const userId = getState().User.userId;
      const taskId = currentTask.id;
      const toSend = processTaskParams(currentTask, userId);
      const res = await taskService.updateTask(taskId, toSend);
      dispatch(taskLoadingDone("updateTask"));
      // dispatch(getTasks()); 
      return res;
    } catch (err) {
      dispatch(alertActions.errorAlert('Error', "We're having trouble saving your updated task. Please try again or contact us.", 20));
      dispatch(taskLoadingDone("updateTask"));
    }
  }
}

export function toggleTaskComplete(task) {
  return async (dispatch, getState) => { 
    dispatch(taskLoading("updateTask"));
    dispatch(toggleComplete(task.id));
    
    try{
      const userId = getState().User.userId;
      const toSend = { user_id: userId, complete: !task.complete };
      const res = await taskService.updateTask(task.id, toSend);
      dispatch(taskLoadingDone("updateTask"));
      // dispatch(getTasks()); 
      return res;
    }catch (err) {
      dispatch(alertActions.errorAlert('Error', err.message, 30));
      dispatch(stopPageLoading());
    }
  }
}

export function toggleComplete(id) {
  return {
    type: actions.TOGGLE_COMPLETE, payload: { id }
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
        tasklist: t.task_list ?? null,
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
      const processedTask = processTaskParams(task, userId);
      const res = await taskService.createTask(processedTask);
      dispatch(getTasks());
      dispatch(taskLoadingDone("createTask"));
      dispatch(alertActions.successAlert('Success',
        "Task successfully created", 10));
      return res;
    } catch (err) {
      console.log(err)
      dispatch(alertActions.errorAlert('Error',
        "We're having trouble creating a new task for you. Please try again or contact us.", 15));
      dispatch(taskLoadingDone("createTask"));
    }
  }
}

export function quickCreateTask(title, object) {
  return async (dispatch, getState) => {
    const userId = getState().User.userId;
    const task = {title, ...object};

    dispatch(taskLoading("createTask"))
    try {
      const processedTask = processTaskParams(task, userId);
      const res = await taskService.createTask(processedTask);
      dispatch(getTasks());
      dispatch(taskLoadingDone("createTask"));
      dispatch(alertActions.successAlert('Success',
        "Task successfully created", 10));
      return res;
    } catch (err) {
      console.log(err)
      dispatch(alertActions.errorAlert('Error',
        "We're having trouble creating a new task for you. Please try again or contact us.", 15));
      dispatch(taskLoadingDone("createTask"));
    }
  }
}

export function deleteTask(taskId) {
  return async (dispatch, getState) => {
    dispatch(taskLoading("deleteTask"))
    try {
      const currentTask = getState().Task.currentTask;
      const res = await taskService.deleteTask(taskId);
      setTimeout(() => {
        dispatch(getTasks());
        if (taskId === currentTask.id) dispatch(selectTask(null))
        dispatch(taskLoadingDone("deleteTask"));
        dispatch(alertActions.successAlert('Success',
          "Task successfully deleted", 10));
      }, 500)
      
      return res;
    } catch (err) {
      dispatch(alertActions.errorAlert('Error',
        "We're having trouble deleting this task for you. Please try again or contact us.", 15));
      dispatch(taskLoadingDone("deleteTask"));
    }
  }
}

function processTaskParams(task, userId) {
  const processed = {};
  processed.user_id = userId;
  Object.keys(task).forEach(key => {
    if (key === "tasklist" && !!task[key]) {
      processed["task_list"] = task[key]._id;
    } else if (key === "tags") {
      const processedTags = task.tags.map(t => t._id);
      processed["tags"] = processedTags;
    } else if (key === "module" && task[key] !== null) {
      processed["module"] = { title: task[key].title, module_code: task[key].moduleCode }
    } else {
      if (task[key] !== null) processed[camelToSnakeCase(key)] = task[key]
    }
  })
  delete processed.id;
  return processed;
}

