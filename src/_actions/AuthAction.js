import { actions } from '../utils/constants/actions';
import UserPool from "../utils/UserPool";
import { userService } from '../_services/userService';
import { authService } from '../_services/authService';
import * as alertActions from './AlertAction';
import { pageLoading, stopPageLoading } from './SharedAction';
import { initializeUserData, logOutUser } from './UserAction';

export function logOutAuth() {
  return { type: actions.LOG_OUT_AUTH }
}

export function setToken(token) {
  return {
    type: actions.SET_TOKEN,
    payload: { accessToken: token }
  }
}

export function checkSession() {
  return async (dispatch, getState) => {
    dispatch(pageLoading('Checking user session'));
    try {
      const user = UserPool.getCurrentUser();
      if (user) {
        const session = await authService.getCognitoSession(user);
        const accessToken = session.accessToken.jwtToken;
        const sub = await authService.getCognitoUserSub(user);
        const res = await userService.getUser(sub, accessToken);
        initializeUserData(dispatch, accessToken, res.data);
      } else {
        dispatch(stopPageLoading());
      }
    } catch (err) {
      //TODO: Dispatch logout
      dispatch(alertActions.errorAlert('Error', err.message, 30));
      dispatch(stopPageLoading());
    }
  }
}

export function logOut() {
  return async (dispatch, getState) => {
    dispatch(pageLoading('Logging user out'));
    try {
      const user = UserPool.getCurrentUser();
      await authService.logOutUser(user);
      dispatch(logOutAuth());
      dispatch(logOutUser());
      dispatch(alertActions.successAlert('Success', "Log out successful.", 30));
    } catch (err) {
      dispatch(alertActions.errorAlert('Error', "We're having trouble logging you out.", 30));
    }
    dispatch(stopPageLoading());
  }
}