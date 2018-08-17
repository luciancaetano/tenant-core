import { IMenuConfig } from "@types";
import { Icon } from "antd";
import React from "react";

const menuConfig: IMenuConfig = {
    breakpoint: "lg",
    theme: "light",
    mode: "inline",
    itens: [
        {
            type: "ROUTER_PATH",
            path: "/",
            match: ["/"],
            title: "Dashboard",
            icon: <Icon type="dashboard"/>,
        },
        {
            type: "SUBMENU",
            match: ["/kanban/all"],
            title: "Kanban",
            icon: <Icon type="bars"/>,
            childrens: [
                {
                    type: "ROUTER_PATH",
                    path: "/kanban/all",
                    match: ["/kanban/all"],
                    title: "All",
                    icon: <Icon type="book"/>,
                },
            ],
        },
    ],
};

export default menuConfig;
