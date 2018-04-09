export default {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    MENU_TOGL: 'TOGGLE_MENU_RESPONSIVE',
    // Session
    LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
    LOGIN_USER_FAILURE: "LOGIN_USER_FAILURE",
    LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST",
    LOGOUT_USER: "LOGOUT_USER",
    INVALID_SESSION: "INVALID_SESSION",
    LOGIN_USER_RESTORE_FAILURE: "LOGIN_USER_RESTORE_FAILURE",
    LOGIN_USER_RESTORE_SUCCESS: "LOGIN_USER_RESTORE_SUCCESS"
};

export interface IActionType<P>{
    type: string;
    payload: P;
}
