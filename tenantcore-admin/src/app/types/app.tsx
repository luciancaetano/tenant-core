import { Theme } from "@material-ui/core/styles";
import { IAction } from "@redux.types";
import React from "react";

export interface IAppConfig {
    isProduction: boolean;
    endPoints: {
        rest: string;
        graphQL: string;
    };
    getReducers: () => {[key: string]: (state: any, action: IAction<any>) => any};
    composeMiddlewares: () => any;
    logo: React.ReactNode;
    themeOptions: any;
}
