import { actions } from '../utils/constants/actions';

export function pageLoading(reason) {
  return {
    type: actions.PAGE_LOADING, payload: { reason }
  }
}

export function stopPageLoading() {
  return {
    type: actions.STOP_PAGE_LOADING
  }
}

export function taskLoading(task) {
  return {
    type: actions.TASK_LOADING, payload: { task }
  }
}

export function taskLoadingDone(task) {
  return {
    type: actions.TASK_LOADING_DONE, payload: { task }
  }
}