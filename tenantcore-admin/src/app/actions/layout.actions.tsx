import { actionSetLocale } from '@luciancaetano/i18n';
import * as langs from '../../i18n';
import types, { IActionType } from './types';

export function toggleMenu (): IActionType<any> {
    return {
        type: types.MENU_TOGL
    };
}

export function localePtBR (): IActionType<any> {
    return actionSetLocale(langs.ptBR.lang_id);
}

export function localeEnUS (): IActionType<any> {
    return actionSetLocale(langs.enUS.lang_id);
}
