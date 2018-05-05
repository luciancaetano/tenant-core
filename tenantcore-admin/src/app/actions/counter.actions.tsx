import types, { IActionType } from './types';


export function increment (): IActionType<any> {
    return {
        type: types.INCREMENT,
    };
}

export function decrement (): IActionType<any> {
    return {
        type: types.DECREMENT,
    };
}
