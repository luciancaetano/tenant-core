import types, { IActionType } from "../actions/types";

const initialState = {
    showMenu: false,
    lang: navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage)
};

export function LayoutReducer (state: any = initialState, action: IActionType = { type: '', payload: {} }): any {
    switch (action.type) {
        case types.LANGUAGE_TOGGLE:
            return {
                ... state,
                lang: action.payload
            };

        case types.MENU_TOGL:
            return {
                ...state,
                showMenu: !state.showMenu
            };
        default:
            return state;
    }
}
