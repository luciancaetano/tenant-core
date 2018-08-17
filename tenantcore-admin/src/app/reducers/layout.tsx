import { ActionTypes } from "@app/actions";
import { IAction } from "@redux.types";
import immutable from "seamless-immutable";

const initialState = immutable({
    drawerOpen: false,
});

export function LayoutReducer(state = initialState, action: IAction<any> = {}) {
    switch (action.type) {
        case ActionTypes.DRAWER_OPEN:
            return state.set("drawerOpen", true);
        case ActionTypes.DRAWER_CLOSE:
            return state.set("drawerOpen", false);
        default:
            return state;
    }
}
