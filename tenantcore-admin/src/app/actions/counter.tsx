import { ActionTypes } from "@redux.actiontypes";
import { IAction } from "@redux.types";

export function Increment(): IAction<any> {
    return {
        type: ActionTypes.INCREMENT,
    };
}

export function Decrement(): IAction<any> {
    return {
        type: ActionTypes.DECREMENT,
    };
}
