import { connectAllState } from "@app.lib";
import headerMenuList from "@app/app.header";
import { CloseDrawer, OpenDrawer } from "@redux.actions/layout";
import { IProfileMenu, IProfileMenuEntry } from "@types";
import { Button, Dropdown, Icon, Layout, Menu } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";

const { Header } = Layout;
/**
 *
 */
const mapProfileMenu = (dispatch, push) => (item: IProfileMenuEntry, index) => {
    if (item.type === "CLICK") {
        return (
            <Menu.Item
                key={index}
                onClick={() => typeof item.onClick === "function" ? item.onClick(dispatch) : null}
            >
                {item.icon || null}
                {item.label}
            </Menu.Item>
        );
    } else if (item.type === "ROUTE") {
        return (
            <Menu.Item
                key={index}
                onClick={() => push(item.path || "/")}
            >
                {item.icon || null}
                {item.label}
            </Menu.Item>
        );
    } else if (item.type === "URL") {
        return (
            <Menu.Item key={index}>
                <a
                    href={item.path || "#"}
                    target={item.target || undefined}
                >
                    {item.icon || null}
                    {item.label}
                </a>
            </Menu.Item>
        );
    } else if (item.type === "DIVIDER") {
        return (
            <Menu.Divider key={index} />
        );
    }
};
/**
 *
 */
const menu = (dispatch, push, itens) => (
    <Menu>
        {itens.map(mapProfileMenu(dispatch, push))}
    </Menu>
);
/**
 *
 */
const mapMenu = (dispatch, push) => (item: IProfileMenu, index) => (
    <Dropdown overlay={menu(dispatch, push, item.itens)} trigger={["click"]} key={index}>
        <Button style={{ float: "right", marginTop: 15, border: "none", padding: 5 }}>
            {item.icon || <Icon type="question"/>}
            <Icon type="down" />
        </Button>
    </Dropdown>
);
/**
 *
 */
export default withRouter(connectAllState(({ state, dispatch, history }) => (
    <Header
        style={{ background: "#fff", padding: "0px 5px 0px 27px", cursor: "pointer" }}
    >
        <Button
            icon={state.layout.drawerOpen ? "menu-unfold" : "menu-fold"}
            onClick={() => state.layout.drawerOpen ? dispatch(CloseDrawer()) : dispatch(OpenDrawer())}
        />
        {headerMenuList.map(mapMenu(dispatch, history.push))}
    </Header>
)) as any);
