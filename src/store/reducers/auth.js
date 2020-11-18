import * as ActionTypes from '../actions/actionTypes';
import { reducerUtility } from '../utility';

const initialState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    userId: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.AUTH_START:
            return reducerUtility(state, {loading: true});
        case ActionTypes.AUTH_SUCCESS:
            return reducerUtility(state, { token: action.token, userId: action.userId, isAuthenticated: true, loading: false, error: null});
        case ActionTypes.AUTH_FAIL:
            return reducerUtility(state, { token: null, isAuthenticated: false, loading: false, error: action.error});
        case ActionTypes.LOGOUT:
            return reducerUtility(state, {token: null, isAuthenticated: false, userId: null});
        default:
            return state;
    }
}

export default reducer;