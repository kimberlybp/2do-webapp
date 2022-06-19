import { actions } from '../utils/constants/actions';
import * as alertActions from './AlertAction';
import { userService } from '../_services/userService';
import { pageLoading, stopPageLoading } from './SharedAction';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from '../utils/UserPool';
import { authService } from '../_services/authService';
import { setToken } from './AuthAction';

// export function login(email, password) {
//   return (dispatch, getState) => {
//     dispatch(pageLoading('user logging in'));
//     const user = new CognitoUser({ Username: email, Pool: UserPool, });
//     const authDetails = new AuthenticationDetails({ Username: email, Password: password });

//     user.authenticateUser(authDetails, {
//       onSuccess: async (data) => {
//         var accessToken = data.getAccessToken().getJwtToken();
//         //TODO: replace this
//         dispatch({
//           type: actions.SET_TOKEN, payload: {
//             access_token: accessToken
//           }
//         });
//         const sub = "";

//         user.getUserAttributes(async (err, res) => {
//           // sub = await res.filter(r => r.Name === 'sub')[0];
//           // console.log(res[0]);
//           try {
//             const res2 = await userService.getUser(res[0].Value, accessToken);
//             console.log(res2);
//             var user = res2.data;
//             //TODO: replace this
//             dispatch();
//           } catch (err) {
//             dispatch(alertActions.errorAlert('Error', err.response.data.message, 30));
//             dispatch(stopPageLoading());
//           }
//         })
//       },
//       onFailure: (err) => {
//         dispatch(alertActions.errorAlert('Error', err.message, 30));
//         dispatch(stopPageLoading())
//       }
//     });
//   }
// }
 function initUser(user) {
  return {
    type: actions.SET_INIT_USER_INFO, payload: {
      user_id: user._id,
      sub_id: user.sub,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_pic_url: user.profile_pic_url
    }
  }
}

export function login(email, password) {
  return async (dispatch, getState) => {
    dispatch(pageLoading('user logging in'));
    const user = new CognitoUser({ Username: email, Pool: UserPool, });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    try {
      let cognitoRes = await authService.asyncAuthenticateUser(user, authDetails);
      if('accessToken' in cognitoRes){
        const accessToken = cognitoRes.getAccessToken().getJwtToken();
        dispatch(setToken(accessToken));
        const sub = await authService.getCognitoUserSub(user);
        const res = await userService.getUser(sub, accessToken);
        dispatch(initUser(res.data));
        dispatch(stopPageLoading());
      }else{
        console.error('unhandled');
      }
    } catch (err) {
      dispatch(alertActions.errorAlert('Error', err.message, 30));
      dispatch(stopPageLoading());
    }
  }
}