import * as immutable from 'seamless-immutable';
import types, { IActionType } from "../actions/types";

const initialState = immutable({
    isAuthenticated: false,
    isAuthenticating: false,
    isError: false,
    statusText: null,
    token: null
});

export function SessionReducer (state: any = initialState, action: IActionType<any>): any {
    switch (action.type) {
        case types.INVALID_SESSION:
            return state.merge({
                isAuthenticated: false,
                isError: false,
                statusText: '',
                token: null
            });
        case types.LOGIN_USER_REQUEST:
            return state.merge({
                isAuthenticating: true,
                isError: false,
                statusText: ''
            });
        case types.LOGIN_USER_RESTORE_FAILURE:
            return state.merge({
                isAuthenticated: false,
                isAuthenticating: false,
                isError: false,
                statusText: action.payload.message,
                token: null
            });
        case types.LOGIN_USER_RESTORE_SUCCESS:
            return state.merge({
                info: action.payload.info,
                isAuthenticated: action.payload.isAuthenticated,
                isAuthenticating: false,
                isError: false,
                statusText: '',
                token: action.payload.token                
            });
        case types.LOGIN_USER_SUCCESS:
            return state.merge({
                info: action.payload.info,
                isAuthenticated: true,
                isAuthenticating: false,
                isError: false,
                statusText: '',
                token: action.payload.token
            });
        case types.LOGIN_USER_FAILURE:
            return state.merge({
                isAuthenticated: false,
                isAuthenticating: false,
                isError: true,
                statusText: `${action.payload.statusText}`,
                token: null
            });
        case types.LOGOUT_USER:
            return state.merge({
                isAuthenticated: false,
                isError: false,
                statusText: '',
                token: null
            });
        default:
            return state;
    }
}
