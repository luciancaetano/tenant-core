export const languageActionTypes = {
    SET_LOCALE: '@luciancaetano/locale:SET_LOCALE'
};

interface IActionType{
    type: string;
    payload: any
}

export const actionSetLocale = (locale: string): IActionType => {
    return {
        type: languageActionTypes.SET_LOCALE,
        payload: locale
    };
};

const lang = (): string => {
    let browserLocale = navigator.language || navigator.userLanguage;
    let lLocale = localStorage.getItem('id_locale');
    return lLocale ? lLocale : browserLocale;
};

export interface Ii18nState{
    locale: string
}

const initialState:Ii18nState = {
    locale: lang()
};


export function LanguageReducer (state: Ii18nState = initialState, action: IActionType = {}): Ii18nState {
    switch (action.type) {
        case languageActionTypes.SET_LOCALE:
            localStorage.setItem('id_locale', action.payload);
            return {
                ...state,
                locale: action.payload
            };
        default:
            return state;
    }
}
