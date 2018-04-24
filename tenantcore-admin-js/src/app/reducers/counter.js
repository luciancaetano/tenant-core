import types, { IActionType } from "../actions/types";
import immutable from 'seamless-immutable';

const initialState = immutable({
    count: 0
});

export function CounterReducer (state: any = initialState, action: IActionType = {}): any {
    switch (action.type) {
        case types.INCREMENT:
            return state.set('count', state.count + 1);
        case types.DECREMENT:
            return state.set('count', state.count - 1);
        default:
            return state;
    }
}
