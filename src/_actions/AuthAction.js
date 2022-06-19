import { actions } from '../utils/constants/actions';

export function setToken(token) {
  return {
    type: actions.SET_TOKEN,
    payload: { accessToken: token }
  }
}