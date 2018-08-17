import { ActionTypes } from "@redux.actiontypes";
import { IAction } from "@redux.types";

export function OpenDrawer(): IAction<any> {
    return {
        type: ActionTypes.DRAWER_OPEN,
    };
}

export function CloseDrawer(): IAction<any> {
    return {
        type: ActionTypes.DRAWER_CLOSE,
    };
}
