import { actions } from '../utils/constants/actions';
import * as alertActions from './AlertAction';
import { userService } from '../_services/userService';
import { pageLoading, stopPageLoading } from './SharedAction';
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from '../utils/UserPool';
import { authService } from '../_services/authService';
import { logOut, setToken, signUpSuccess } from './AuthAction';

function initUser(user) {
  return {
    type: actions.SET_INIT_USER_INFO, payload: {
      userId: user._id,
      subId: user.sub,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      profilePicUrl: user.profile_pic_url
    }
  }
}

export function noUser() {
  return {
    type: actions.NO_USER_LOGGED_IN
  }
}

export function login(email, password) {
  return async (dispatch, getState) => {
    dispatch(pageLoading('user logging in'));
    const user = new CognitoUser({ Username: email, Pool: UserPool, });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    try {
      let cognitoRes = await authService.asyncAuthenticateUser(user, authDetails);
      if ('accessToken' in cognitoRes) {
        const accessToken = cognitoRes.getAccessToken().getJwtToken();
        const sub = await authService.getCognitoUserSub(user);
        const res = await userService.getUser(sub, accessToken);
        initializeUserData(dispatch, accessToken, res.data);
      } else {
        console.error('unhandled');
      }
    } catch (err) {
      dispatch(logOut());
      if(err.message.includes("not confirmed")) dispatch(alertActions.errorAlert('Error', "Email not verified", 30));
      else dispatch(alertActions.errorAlert('Error', err.message, 30));
      
      dispatch(stopPageLoading());
    }
  }
}

export function signUp(data) {
  return async (dispatch, getState) => { 
    dispatch(pageLoading('user signing up'));
    const attributeList = [];
    const dataEmail = { 
      Name: 'email',
      Value: data.email
    }
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    try {
      const res = await authService.asyncSignUp(UserPool, data.email, data.password, attributeList);
      const user = {
        sub: res.sub,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      }
      // eslint-disable-next-line
      const createRes = await userService.createUser(user);
      dispatch(signUpSuccess());
      dispatch(stopPageLoading());
    } catch (err) {
      dispatch(alertActions.errorAlert('Error', err.message, 30));
      dispatch(stopPageLoading());
    }
  }
}


export function initializeUserData(dispatch, accessToken, user) {
  dispatch(setToken(accessToken));
  dispatch(initUser(user));
  dispatch(stopPageLoading());
}

export function logOutUser() {
  return { type: actions.LOG_OUT_USER }
}