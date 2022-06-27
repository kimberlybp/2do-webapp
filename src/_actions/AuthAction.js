import { actions } from '../utils/constants/actions';
import UserPool from "../utils/UserPool";
import { userService } from '../_services/userService';
import { authService } from '../_services/authService';
import * as alertActions from './AlertAction';
import { pageLoading, stopPageLoading } from './SharedAction';
import { initializeUserData, logOutUser } from './UserAction';

export function reset() {
  return { type: actions.RESET_APP }
}

export function logOutAuth() {
  return { type: actions.LOG_OUT_AUTH }
}

export function signUpSuccess() {
  return { type: actions.SIGN_UP_SUCCESS }
}

export function clearSignUpStatus() {
  return { type: actions.CLEAR_SIGN_UP_STATUS }
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
    setTimeout(async () => {
      try {
        const user = UserPool.getCurrentUser();
        await authService.logOutUser(user);
        dispatch(reset());
        // dispatch(alertActions.successAlert('Success', "Log out successful.", 30));
        dispatch(stopPageLoading());
      } catch (err) {
        dispatch(alertActions.errorAlert('Error', "An unexpected error has occured.", 30));
        dispatch(stopPageLoading());
      }
    }, 3000)

  }
}