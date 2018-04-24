import classNames from 'classnames';
import React, { Component, ReactNode } from "react";
import { NavLink } from 'react-router-dom';
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap';
import nav from '../../app.nav';
import SidebarFooter from './SidebarFooter';
import SidebarForm from './SidebarForm';
import SidebarHeader from './SidebarHeader';
import SidebarMinimizer from './SidebarMinimizer';

class Sidebar extends Component<any, any, any> {
    public handleClick (e: any) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }

    public activeRoute (routeName: string, props: any): any {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
        return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    }

    // todo Sidebar nav secondLevel
    // secondLevelActive(routeName) {
    //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    // }


    public render (): ReactNode {
        const props = this.props;
        const activeRoute = this.activeRoute;
        const handleClick = this.handleClick;

        // badge addon to NavItem
        const badge = (tbadge: any): ReactNode | void => {
            if (tbadge) {
                const classes = classNames(tbadge.class);
                return (<Badge className={classes} color={tbadge.variant}>{ tbadge.text }</Badge>);
            }
        };

        // simple wrapper for nav-title item
        const wrapper = (item: any): any => (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name);

        // nav list section title
        const title = (ttitle: any, key: any): ReactNode => {
            const classes = classNames('nav-title', ttitle.class);
            return (<li key={key} className={classes}>{wrapper(ttitle)} </li>);
        };

        // nav list divider
        const divider = (tdivider: any, key: any): ReactNode => {
            const classes = classNames('divider', tdivider.class);
            return (<li key={key} className={classes} />);
        };

        // nav item with nav link
        const navItem = (item: any, key: any): ReactNode => {
            const classes = {
                item: classNames(item.class),
                link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
                icon: classNames(item.icon)
            };
            return (
                // eslint-disable-next-line
                navLink(item, key, classes)
            );
        };

        // nav link
        const navLink = (item: any, key: any, classes: any): ReactNode => {
            const url = item.url ? item.url : '';
            return (
                <NavItem key={key} className={classes.item}>
                    { // eslint-disable-next-line
                        isExternal(url) ?
                            <RsNavLink href={url} className={classes.link} active={true}>
                                <i className={classes.icon} />{item.name}{badge(item.badge)}
                            </RsNavLink> :
                            <NavLink to={url} className={classes.link} activeClassName="active">
                                <i className={classes.icon} />{item.name}{badge(item.badge)}
                            </NavLink>
                    }
                </NavItem>
            );
        };

        // nav dropdown
        const navDropdown = (item: any, key: any): ReactNode => {
            return (
                <li key={key} className={activeRoute(item.url, props)}>
                    <a className="nav-link nav-dropdown-toggle" href="#" onClick={e => handleClick(e)}><i className={item.icon} />{item.name}</a>
                    <ul className="nav-dropdown-items">
                        {// eslint-disable-next-line
                            navList(item.children)}
                    </ul>
                </li>);
        };

        // nav type
        const navType = (item: any, idx: any): ReactNode =>
            item.title ? title(item, idx) :
                item.divider ? divider(item, idx) :
                    item.children ? navDropdown(item, idx) :
                        navItem(item, idx);

        // nav list
        const navList = (items: any): ReactNode => {
            return items.map((item: any, index: any): any => navType(item, index));
        };

        const isExternal = (url: any): any => {
            const link = url ? url.substring(0, 4) : '';
            return link === 'http';
        };

        // sidebar-nav root
        return (
            <div className="sidebar">
                <SidebarHeader/>
                <SidebarForm/>
                <nav className="sidebar-nav">
                    <Nav>
                        {navList(nav.items)}
                    </Nav>
                </nav>
                <SidebarFooter/>
                <SidebarMinimizer/>
            </div>
        );
    }
}

export default Sidebar;
