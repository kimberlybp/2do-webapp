import { actions } from '../utils/constants/actions';
import { pageLoading, stopPageLoading, taskLoading, taskLoadingDone } from './SharedAction';
import * as alertActions from './AlertAction';
import { moduleService } from '../_services/moduleService';

export function updateTaskParam(key, value) {
  return {
    type: actions.UPDATE_TASK_PARAM, payload: { key, value }
  }
}

export function selectTask(task) {
  return {
    type: actions.SELECT_TASK, payload: { task }
  }
}

