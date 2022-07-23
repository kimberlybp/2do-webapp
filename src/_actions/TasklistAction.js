import { actions } from '../utils/constants/actions';
import { tasklistService } from '../_services/tasklistService';
import { stopPageLoading, taskLoading, taskLoadingDone } from './SharedAction';
import * as alertActions from './AlertAction';

function setInitTasklists(tasklists) {
  return {
    type: actions.SET_INIT_TASKLISTS, payload: { tasklists }
  }
}

export function getTasklists() {
  return async (dispatch, getState) => {
    const userId = getState().User.userId;
    try {
      const res = await tasklistService.getUserTasklists(userId);
      dispatch(setInitTasklists(res));
    }catch (err) {
      dispatch(alertActions.errorAlert('Error', err.message, 30));
      dispatch(stopPageLoading());
    }
  }
}

export function createTasklist(tasklist) {
  return async (dispatch, getState) => {
    const userId = getState().User.userId;
    dispatch(taskLoading("createTasklist"))
    try {
      tasklist.user_id = userId;
      const res = await tasklistService.createTasklist(tasklist);
      dispatch(getTasklists());
      dispatch(taskLoadingDone("createTasklist"));
      return res;
    }catch (err) {
      dispatch(alertActions.errorAlert('Error', 
      "We're having trouble creating a new task list for you. Please try again or contact us.", 30));
    }
  }
}


