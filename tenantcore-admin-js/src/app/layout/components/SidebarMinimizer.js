import React, { Component, ReactNode } from "react";

class SidebarMinimizer extends Component {
    sidebarMinimize () {
        document.body.classList.toggle('sidebar-minimized');
    }

    brandMinimize () {
        document.body.classList.toggle('brand-minimized');
    }

    render (): ReactNode {
        return (
            <button className="sidebar-minimizer" type="button" onClick={(event) => { this.sidebarMinimize(); this.brandMinimize(); }} />
        );
    }
}

export default SidebarMinimizer;