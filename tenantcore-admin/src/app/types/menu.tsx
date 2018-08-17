import { IAction } from "@redux.types";
import React from "react";

export interface IMenuConfig {
    itens: IMenuConfigEntry[];
    breakpoint: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    theme: "light" | "dark";
    mode?: "inline" | "horizontal" | "vertical" | "vertical-left" | "vertical-right";
}

export interface IMenuConfigEntry {
    type: "EXTERNAL_URL" | "ROUTER_PATH" | "SUBMENU";
    path?: string;
    title: string | React.ReactNode;
    icon: React.ReactNode;
    target?: string | "_blank";
    match?: string[];
    childrens?: IMenuConfigEntry[];
    uid?: string;
}

export interface IProfileMenu {
    icon?: React.ReactNode;
    text?: React.ReactNode;
    itens: IProfileMenuEntry[];
}
export interface IProfileMenuEntry {
    type: "CLICK" | "URL" | "ROUTE" | "DIVIDER";
    label?: React.ReactNode;
    icon?: React.ReactNode;
    path?: any;
    onClick?: (dispatch: (action: IAction<any>) => void) => void;
    target?: string;
}
