import types, { IActionType } from "../actions/types";
import immutable from 'seamless-immutable';

const initialState = immutable({
    token: null,
    isError: false,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
});

export function SessionReducer (state: any = initialState, action: IActionType = {}): any {
    switch (action.type) {
        case types.INVALID_SESSION:
            return state.merge({
                isError: false,
                isAuthenticated: false,
                token: null,
                statusText: ''
            });
        case types.LOGIN_USER_REQUEST:
            return state.merge({
                isError: false,
                isAuthenticating: true,
                statusText: ''
            });
        case types.LOGIN_USER_RESTORE_FAILURE:
            return state.merge({
                isError: false,
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                statusText: action.payload.message
            });
        case types.LOGIN_USER_RESTORE_SUCCESS:
            return state.merge({
                isError: false,
                isAuthenticating: false,
                isAuthenticated: action.payload.isAuthenticated,
                token: action.payload.token,
                statusText: '',
                info: action.payload.info
            });
        case types.LOGIN_USER_SUCCESS:
            return state.merge({
                isError: false,
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.payload.token,
                statusText: '',
                info: action.payload.info
            });
        case types.LOGIN_USER_FAILURE:
            return state.merge({
                isError: true,
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                statusText: `${action.payload.statusText}`
            });
        case types.LOGOUT_USER:
            return state.merge({
                isError: false,
                isAuthenticated: false,
                token: null,
                statusText: ''
            });
        default:
            return state;
    }
}
