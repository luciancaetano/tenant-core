import types, { IActionType } from './types';
import * as langs from '../../i18n';
import { actionSetLocale } from '@luciancaetano/i18n';

export function toggleMenu : IActionType {
    return {
        type: types.MENU_TOGL
    };
}

export function localePtBR (): IActionType {
    return actionSetLocale(langs.ptBR.lang_id);
}

export function localeEnUS (): IActionType {
    return actionSetLocale(langs.enUS.lang_id);
}
