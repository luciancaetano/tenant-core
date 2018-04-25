import React, { Component, ReactNode } from "react";
import { Badge, Nav, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';

class Header extends Component {
    public sidebarToggle (e: React.MouseEvent<any>) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    public sidebarMinimize (e: React.MouseEvent<any>) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    public mobileSidebarToggle (e: React.MouseEvent<any>) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    public asideToggle (e: React.MouseEvent<any>) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }

    public render () {
        return (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={e => this.mobileSidebarToggle(e)}>
                    <span className="navbar-toggler-icon" />
                </NavbarToggler>
                <NavbarBrand href="#" />
                <NavbarToggler className="d-md-down-none mr-auto" onClick={e => this.sidebarToggle(e)}>
                    <span className="navbar-toggler-icon" />
                </NavbarToggler>
                <Nav className="ml-auto" navbar={true}>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#"><i className="icon-bell" /><Badge pill={true} color="danger">5</Badge></NavLink>
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
