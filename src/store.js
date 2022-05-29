import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './_reducers/_rootReducer';
import logger from 'redux-logger';

let middleware;

if (process.env.NODE_ENV === 'production') {
    //Production
    middleware = compose(applyMiddleware(thunk));
} else {
    //Development
    middleware = compose(applyMiddleware(thunk, logger));
}

const store = createStore(rootReducer, middleware);
export default store;