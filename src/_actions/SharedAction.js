import { actions } from '../utils/constants/actions';

export function pageLoading(reason) {
  return {
    type: actions.PAGE_LOADING, payload: { reason: reason }
  }
}

export function stopPageLoading() {
  return {
    type: actions.STOP_PAGE_LOADING
  }
}