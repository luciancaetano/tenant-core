import { IProfileMenu } from "@types";
import { Icon } from "antd";
import React from "react";

const headerMenuList: IProfileMenu[] = [
    {
        icon: <Icon type="user" />,
        itens: [
            {
                type: "CLICK",
                onClick: (d) => alert("Logout"),
                label: "Logout",
                icon: <Icon type="logout" />,
            },
            {
                type: "DIVIDER",
            },
            {
                type: "ROUTE",
                label: "404",
                path: "/404",
                icon: <Icon type="laptop" />,
            },
        ],
    },
];

export default headerMenuList;
