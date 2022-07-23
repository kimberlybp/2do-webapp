import { actions } from '../utils/constants/actions';
import { taskService } from '../_services/taskService';
import { pageLoading, stopPageLoading } from './SharedAction';
import * as alertActions from './AlertAction';

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

export function createTask() {
  return {
    type: actions.CREATE_TASK
  }
}

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
        dueDate: t.due_date,
        createdAt: t.created_at,
        updatedAt: t.updated_at,
        module: t.module
      }))
      dispatch(setInitTasks(updated));
    }catch (err) {
      dispatch(alertActions.errorAlert('Error', err.message, 30));
      dispatch(stopPageLoading());
    }
  }
}


