import RouterModule from "@app/layout/RouterModule";
import { Icon, Layout, Menu } from "antd";
import React, { StrictMode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideMenu from "./Menu";

export default ({ }: any) => (
    <Layout
        style={{ minHeight: "100%" }}
    >
        <SideMenu />
        <Layout style={{ marginLeft: 0 }}>
            <Header />
            <Layout.Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                <RouterModule />
            </Layout.Content>
            <Footer />
        </Layout>
    </Layout>
);
