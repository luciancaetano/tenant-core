import jwtDecode from 'jwt-decode';
import { Dispatch } from 'redux';
import {restApiUrl} from '../app.config';
import types, { IActionType } from './types';

export function baseApiUrl(endpoint:string):string{
    return `${restApiUrl.development}/${endpoint}`;
}

/**
 *
 */
export function loginUserRestore (): any {
    return (dispatch: Dispatch<any>) => {
        try {
            const tokenStr:string | null = localStorage.getItem('id_token');
            const idToken:any = jwtDecode(String(tokenStr));
            const date = new Date(0);
            date.setUTCSeconds(idToken.exp);

            if (!(date.valueOf() > new Date().valueOf())) {
                dispatch({
                    payload: {
                        message: 'Token Expired.',
                    },
                    type: types.LOGIN_USER_RESTORE_FAILURE,
                });
            } else {
                dispatch({
                    payload: {
                        info: idToken,
                        isAuthenticated: true,
                        token: localStorage.getItem('id_token'),
                    },
                    type: types.LOGIN_USER_RESTORE_SUCCESS,
                });
            }
        } catch (e) {
            // dispatch(notif.notifyDanger('Token de acesso inválido.', 5000));
            dispatch({
                payload: {
                    message: e.message,
                },
                type: types.LOGIN_USER_RESTORE_FAILURE,
            });
        }
    };
}


export function loginUserRenew (): any {
    return (dispatch: () => void , getState: () => void) => {
        //
    };
}
/**
 *
 * @param {*String} token
 */
export function loginUserSuccess (token: string, info: any): IActionType<{token:string; info: any}> {
    localStorage.setItem('id_token', token);
    return {
        payload: {
            info,
            token,
        },
        type: types.LOGIN_USER_SUCCESS,
    };
}
/**
 *
 */
export function loginUserFailure (error: {response: {status: any; statusText: string}}): IActionType<any>  {
    localStorage.removeItem('id_token');
    return {
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
        type: types.LOGIN_USER_FAILURE,
    };
}
/**
 *
 */
export function loginUserRequest (): IActionType<any> {
    return { type: types.LOGIN_USER_REQUEST };
}
/**
 * Logout
 */
export function logout (): IActionType<any> {
    localStorage.removeItem('id_token');
    return { type: types.LOGOUT_USER };
}
/**
 * InvalidToken
 */
export function invalidSession (): IActionType<any> {
    localStorage.removeItem('id_token');
    return { type: types.INVALID_SESSION };
}
/**
 * Login
 */
export function loginUser (email: string, password: string): any {
    return (dispatch: Dispatch<any>): any => {
        dispatch(loginUserRequest());
        return fetch(baseApiUrl('session'), {
            body: JSON.stringify({ email, password }),
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
        })
            .then((response: Response): Response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response: Response): Response => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    const error:any = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then((response: Response): Promise<any> => {
                return response.json();
            })
            .then((response: any) => {
                try {
                    const decoded:any = jwtDecode(response.data);
                    const date = new Date(0);
                    date.setUTCSeconds(decoded.exp);
                    if (!(date.valueOf() > new Date().valueOf())) {
                        dispatch(loginUserFailure({
                            response: {
                                status: 401,
                                statusText: 'Token Expired',
                            },
                        }));
                    } else {
                        dispatch(loginUserSuccess(response.data, decoded));
                    }
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: e.message,
                        },
                    }));
                }
            })
            .catch((error: any) => {
                dispatch(loginUserFailure({
                    response: {
                        status: error.status,
                        statusText: error.message,
                    },
                }));
            });
    };
}


export function loginRenew (): (dispatch: Dispatch<any>) => void {
    return (dispatch: Dispatch<any>): Promise<any> => {
        return fetch(baseApiUrl('session/renew'), {
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
        })
            .then((response: Response): Response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response: Response): Response => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    const error:any = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then((response: Response): any => {
                return response.json();
            })
            .then((response: any) => {
                try {
                    const decoded:any = jwtDecode(response.data);
                    const date = new Date(0);
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
