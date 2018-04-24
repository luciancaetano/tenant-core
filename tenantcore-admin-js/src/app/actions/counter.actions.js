import types, { IActionType } from './types';


export function increment (): IActionType {
    return {
        type: types.INCREMENT
    };
}

export function decrement (): IActionType {
    return {
        type: types.DECREMENT
    };
}
