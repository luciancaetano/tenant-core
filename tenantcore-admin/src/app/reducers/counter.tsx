import { ActionTypes } from "@app/actions";
import { IAction } from "@redux.types";
import immutable from "seamless-immutable";

const initialState = immutable({
    count: 0,
});

export function CounterReducer(state = initialState, action: IAction<any> = {}) {
    switch (action.type) {
        case ActionTypes.INCREMENT:
            return state.set("count", ((state.count + 1) > 10 ? 10 : state.count + 1));
        case ActionTypes.DECREMENT:
            return state.set("count", ((state.count - 1) < -10 ? -10 : state.count - 1));
        default:
            return state;
    }
}
