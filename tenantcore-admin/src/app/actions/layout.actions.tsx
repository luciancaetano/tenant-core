import types, { IActionType } from './types';

export function toggleMenu (): IActionType<any> {
    return {
        type: types.MENU_TOGL,
    };
}