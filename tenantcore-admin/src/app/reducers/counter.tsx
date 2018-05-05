import * as immutable from 'seamless-immutable';
import types, { IActionType } from '../actions/types';

const initialState = immutable({
    count: 0,
});

export function CounterReducer (state: any = initialState, action: IActionType<{count:number}>): any {
    switch (action.type) {
        case types.INCREMENT:
            return state.set('count', state.count + 1);
        case types.DECREMENT:
            return state.set('count', state.count - 1);
        default:
            return state;
    }
}
