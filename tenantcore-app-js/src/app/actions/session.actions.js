import types, { IActionType } from "./types";
import { AppConfig } from '../app.config';
import jwtDecode from 'jwt-decode';
/**
 *
 */
export function loginUserRestore (): any {
    return (dispatch: Function, getState: Function) => {
        try {
            let idToken = jwtDecode(localStorage.getItem('id_token'));
            let date = new Date(0);
            date.setUTCSeconds(idToken.exp);

            if (!(date.valueOf() > new Date().valueOf())) {
                dispatch({
                    type: types.LOGIN_USER_RESTORE_FAILURE,
                    payload: {
                        message: 'Token Expired.'
                    }
                });
            } else {
                dispatch({
                    type: types.LOGIN_USER_RESTORE_SUCCESS,
                    payload: {
                        token: localStorage.getItem('id_token'),
                        isAuthenticated: true,
                        info: idToken
                    }
                });
            }
        } catch (e) {
            //dispatch(notif.notifyDanger('Token de acesso inválido.', 5000));
            dispatch({
                type: types.LOGIN_USER_RESTORE_FAILURE,
                payload: {
                    message: e.message
                }
            });
        }
    };
}


export function loginUserRenew (): any {
    return (dispatch: Function, getState: Function) => {

    };
}
/**
 *
 * @param {*String} token
 */
export function loginUserSuccess (token: string, info: any): IActionType {
    localStorage.setItem('id_token', token);
    return {
        type: types.LOGIN_USER_SUCCESS,
        payload: {
            token: token,
            info: info
        }
    };
}
/**
 *
 */
export function loginUserFailure (error: {response: {status: any, statusText: string}}): IActionType {
    localStorage.removeItem('id_token');
    return {
        type: types.LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}
/**
 *
 */
export function loginUserRequest (): IActionType {
    return { type: types.LOGIN_USER_REQUEST };
}
/**
 * Logout
 */
export function logout (): IActionType {
    localStorage.removeItem('id_token');
    return { type: types.LOGOUT_USER };
}
/**
 * InvalidToken
 */
export function invalidSession (): IActionType {
    localStorage.removeItem('id_token');
    return { type: types.INVALID_SESSION };
}
/**
 * Login
 */
export function loginUser (email: string, password: string): (dispatch: Function) => void {
    return (dispatch: Function): void => {
        dispatch(loginUserRequest());
        return fetch(AppConfig.baseApiUrl('session'), {
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify({ email: email, password: password }),
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response: Response): Promise<Response> {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response: Response): Promise<Response> => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then((response: Response): Promise<any> => {
                return response.json();
            })
            .then((response: any) => {
                try {
                    let decoded = jwtDecode(response.data);
                    let date = new Date(0);
                    date.setUTCSeconds(decoded.exp);
                    if (!(date.valueOf() > new Date().valueOf())) {
                        dispatch(loginUserFailure({
                            response: {
                                status: 401,
                                statusText: 'Token Expired'
                            }
                        }));
                    } else {
                        dispatch(loginUserSuccess(response.data, decoded));
                    }
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: e.message
                        }
                    }));
                }
            })
            .catch((error: any) => {
                dispatch(loginUserFailure({
                    response: {
                        status: error.status,
                        statusText: error.message
                    }
                }));
            });
    };
}


export function loginRenew (): (dispatch: Function) => void {
    return (dispatch: Function): void => {
        return fetch(AppConfig.baseApiUrl('session/renew'), {
            method: 'POST',
            cache: 'no-cache',
            body: {},
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response: Response): Promise<Response> {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response: Response): Promise<Response> => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then((response: Response): any => {
                return response.json();
            })
            .then((response: any) => {
                try {
                    let decoded = jwtDecode(response.data);
                    let date = new Date(0);
                    date.setUTCSeconds(decoded.exp);
                    if (!(date.valueOf() > new Date().valueOf())) {
                        return;
                    } else {
                        dispatch(loginUserSuccess(response.data, decoded));
                    }
                } catch (e) {
                    return;
                }
            })
            .catch((error: any) => {
                return;
            });
    };
}
