import appConfig from "@app.config";
import { connectAllState } from "@app.lib";
import { CloseDrawer, OpenDrawer } from "@redux.actions/layout";
import { IMenuConfig, IMenuConfigEntry } from "@types";
import { Icon, Layout, Menu } from "antd";
import React from "react";
import { matchPath, RouteComponentProps, withRouter } from "react-router-dom";
import uuid from "uuid/v5";
import _menuConfig from "../app.menu";

/**
 * Se uuid on item
 * @param item
 */
const setUid = (item: IMenuConfigEntry) => ({
    ...item,
    uid: uuid(`${Math.random()}-${JSON.stringify(item)}`, uuid.DNS),
    childrens: item.type === "SUBMENU" &&
        item.childrens instanceof Array ?
        item.childrens.map(setUid) : item.childrens,
});
/**
 * Add uuid to all menu itens
 */
const menuConfig = ({
    ..._menuConfig,
    itens: _menuConfig.itens.map(setUid),
});
/**
 * Make menu itens plan for easy matching but keep childrens for
 * open keys
 */
const flatMenuIten: IMenuConfigEntry[] = (() => {
    const result: IMenuConfigEntry[] = [];

    const Iterate = (item: IMenuConfigEntry) => {
        if (item.type === "SUBMENU" && item.childrens instanceof Array) {
            result.push(item);
            item.childrens.forEach(Iterate);
        } else {
            result.push(item);
        }
    };

    menuConfig.itens.forEach(Iterate);
    return result;
})();
/**
 * Filter current router selected menu item
 * @param currPath
 */
const filterSelectedKeys = (currPath: string, filter?: (item: IMenuConfigEntry) => boolean) =>
    flatMenuIten
        .filter((item) => {
            let matches = 0;
            const matchPaths = (imatch: string) => {
                const path = {
                    path: imatch,
                    exact: true,
                };
                if (matchPath(currPath, path)) {
                    matches++;
                }
            };

            const iterateItens = (mItem: IMenuConfigEntry) => {
                if (mItem.type === "SUBMENU" && mItem.childrens instanceof Array) {
                    mItem.childrens.forEach(iterateItens);
                } else if (mItem.match instanceof Array) {
                    mItem.match.forEach(matchPaths);
                }
            };

            if (item.type === "SUBMENU" && item.childrens instanceof Array) {
                item.childrens.forEach(iterateItens);
            } else if (item.match instanceof Array) {
                item.match.forEach(matchPaths);
            }
            return matches > 0;
        })
        .filter(filter ? filter : () => true)
        .map((item, index) => String(item.uid));
/**
 * Render menu item title
 * @param item
 */
const renderMenuItemTitle = (item: IMenuConfigEntry) => (
    <React.Fragment>{item.icon}<span className="nav-text">{item.title}</span></React.Fragment>
);
/**
 * Render menu itens
 * @param navigate
 */
const renderMenuItens = (navigate: (path: string, state?: any) => void) => (item: IMenuConfigEntry, index: number) => {
    if (item.type === "ROUTER_PATH" || item.type === "EXTERNAL_URL") {
        return (
            <Menu.Item key={item.uid} onClick={(e) => navigate(item.path || "/")}>
                {renderMenuItemTitle(item)}
            </Menu.Item>
        );
    } else if (item.type === "SUBMENU" && item.childrens instanceof Array) {
        return (
            <Menu.SubMenu key={item.uid} title={renderMenuItemTitle(item)}>
                {item.childrens.map(renderMenuItens(navigate))}
            </Menu.SubMenu>
        );
    } else {
        throw new Error(`Invalid menu item type "${item.type}"`);
    }
};
/**
 * Menu item component
 */
const MenuComponent: any = ({ state, dispatch, location, history }: any & RouteComponentProps<any>) => (
    <Layout.Sider
        theme={menuConfig.theme}
        trigger={null}
        breakpoint={menuConfig.breakpoint}
        collapsed={state.layout.drawerOpen}
        collapsedWidth={window.innerWidth > 600 ? 80 : 0}
        onBreakpoint={(breakpoint) => breakpoint ? dispatch(OpenDrawer()) : dispatch(CloseDrawer())}
    >
        {appConfig.logo}
        <Menu
            theme={menuConfig.theme}
            mode={menuConfig.mode}
            inlineCollapsed={state.layout.drawerOpen}
            selectedKeys={filterSelectedKeys(location.pathname)}
            defaultOpenKeys={filterSelectedKeys(location.pathname, (item) => item.type === "SUBMENU")}
        >
            {menuConfig.itens.map(renderMenuItens(history.push))}
        </Menu>
    </Layout.Sider>
);

export default withRouter(connectAllState(MenuComponent));
