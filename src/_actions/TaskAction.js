import { actions } from '../utils/constants/actions';
import { pageLoading, stopPageLoading, taskLoading, taskLoadingDone } from './SharedAction';
import * as alertActions from './AlertAction';
import { moduleService } from '../_services/moduleService';

function updateCurrentTask(key, value) {
  return {
    type: actions.UPDATE_TASK_PARAM, payload: { key, value }
  }
}

export function updateTaskParam(key, value) {
  return async (dispatch, getState) => { 
    dispatch(updateCurrentTask(key, value));
    dispatch(save());
  }
}

export function save() {
  return {
    type: actions.UPDATE_TASKLIST_SYNC
  }
}

export function selectTask(task) {
  return {
    type: actions.SELECT_TASK, payload: { task }
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

