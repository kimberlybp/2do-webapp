import { actions } from '../utils/constants/actions';
import { tagService } from '../_services/tagService';
import { stopPageLoading, taskLoading, taskLoadingDone } from './SharedAction';
import * as alertActions from './AlertAction';

function setInitTags(tags) {
  return {
    type: actions.SET_INIT_TAGS, payload: { tags }
  }
}

export function getTags() {
  return async (dispatch, getState) => {
    const userId = getState().User.userId;
    try {
      const res = await tagService.getUserTags(userId);
      dispatch(setInitTags(res));
    } catch (err) {
      dispatch(alertActions.errorAlert('Error', err.message, 30));
      dispatch(stopPageLoading());
    }
  }
}

export function createTag(tag) {
  return async (dispatch, getState) => {
    const userId = getState().User.userId;
    dispatch(taskLoading("createTag"))
    try {
      tag.user_id = userId;
      const res = await tagService.createTag(tag);
      dispatch(getTags());
      dispatch(taskLoadingDone("createTag"));
      return res;
    } catch (err) {
      dispatch(alertActions.errorAlert('Error',
        "We're having trouble creating a new tag for you. Please try again or contact us.", 30));
    }
  }
}


