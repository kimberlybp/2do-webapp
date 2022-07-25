import { actions } from '../utils/constants/actions';
import { taskLoading, taskLoadingDone } from './SharedAction';
import * as alertActions from './AlertAction';
import { moduleService } from '../_services/moduleService';

function loadAllModules(allModules) {
  return {
    type: actions.LOAD_ALL_MODULES, payload: { allModules }
  }
}

export function getAllModules() {
  return async (dispatch, getState) => {
    dispatch(taskLoading("moduleSearch"))
    try {
      const res = await moduleService.getAllModules();
      dispatch(loadAllModules(res));
      dispatch(taskLoadingDone("moduleSearch"));
    }catch (err) {
      dispatch(alertActions.warningAlert('Warning', 
      "We're having trouble loading modules from NUSMods. You may not be able to edit your modules within the tasks at the moment.", 30));
    }
  }
}
