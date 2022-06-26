import { combineReducers } from "redux";
import Shared from './SharedReducer';
import Auth from './AuthReducer';
import Alert from './AlertReducer';
import User from './UserReducer';
import Module from './ModuleReducer';

export default combineReducers({ 
  Shared, Auth, Alert, User, Module
});

