import React, { Component, ReactNode } from "react";

class SidebarMinimizer extends Component {
    public sidebarMinimize () {
        document.body.classList.toggle('sidebar-minimized');
    }

    public brandMinimize () {
        document.body.classList.toggle('brand-minimized');
    }

    public render (): ReactNode {
        return (
            <button className="sidebar-minimizer" type="button" onClick={(event) => { this.sidebarMinimize(); this.brandMinimize(); }} />
        );
    }
}

export default SidebarMinimizer;
