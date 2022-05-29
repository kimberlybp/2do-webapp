import { actions } from '../utils/constants/actions';

const initState = {
    isPageLoading: false,
    pageLoadReason:''
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
        default: {
            return state
        }
    }
}

export default reducer;