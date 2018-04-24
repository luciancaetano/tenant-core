import React, { Component, ReactNode } from "react";
import { NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';

class Header extends Component {
    sidebarToggle (e: Event) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize (e: Event) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle (e: Event) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle (e: Event) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }

    render (): ReactNode {
        return (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                    <span className="navbar-toggler-icon" />
                </NavbarToggler>
                <NavbarBrand href="#" />
                <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
                    <span className="navbar-toggler-icon" />
                </NavbarToggler>
                <Nav className="ml-auto" navbar>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#"><i className="icon-bell" /><Badge pill color="danger">5</Badge></NavLink>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#"><i className="icon-list" /></NavLink>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#"><i className="icon-location-pin" /></NavLink>
                    </NavItem>
                    <HeaderDropdown/>
                </Nav>
            </header>
        );
    }
}

export default Header;
