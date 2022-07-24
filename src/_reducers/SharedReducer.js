import { actions } from '../utils/constants/actions';

const initState = {
    isPageLoading: false,
    pageLoadReason:'',
    loadingTasks: {}
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case actions.PAGE_LOADING: {
            const { reason } = action.payload;
            return {
                ...state,
                isPageLoading: true,
                pageLoadReason: reason
            }
        }
        case actions.STOP_PAGE_LOADING: {
            return {
                ...state,
                isPageLoading: false,
                pageLoadReason:''
            }
        }
        case actions.TASK_LOADING: {
            return {
                ...state,
                loadingTasks:{
                  ...state.loadingTasks,
                  [action.payload.task]: true
                }
            }
        }
        case actions.TASK_LOADING_DONE: {
            return {
                ...state,
                loadingTasks:{
                  ...state.loadingTasks,
                  [action.payload.task]: false
                }
            }
        }
        default: {
            return state
        }
    }
}

export default reducer;