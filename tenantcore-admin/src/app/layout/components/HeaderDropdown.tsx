import React, { Component, ReactNode } from "react";
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import avatarImg from '../../../media/avatars/1.jpg';

class HeaderDropdown extends Component<any, any, any> {
    constructor (props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    public toggle () {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    public dropAccnt (): ReactNode {
        return (
            <Dropdown nav={true} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav={true}>
                    <img src={avatarImg} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                </DropdownToggle>
                <DropdownMenu right={false}>
                    <DropdownItem header={true} tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                    <DropdownItem><i className="fa fa-bell-o" /> Updates<Badge color="info">42</Badge></DropdownItem>
                    <DropdownItem><i className="fa fa-envelope-o" /> Messages<Badge color="success">42</Badge></DropdownItem>
                    <DropdownItem><i className="fa fa-tasks" /> Tasks<Badge color="danger">42</Badge></DropdownItem>
                    <DropdownItem><i className="fa fa-comments" /> Comments<Badge color="warning">42</Badge></DropdownItem>
                    <DropdownItem header={true} tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                    <DropdownItem><i className="fa fa-user" /> Profile</DropdownItem>
                    <DropdownItem><i className="fa fa-wrench" /> Settings</DropdownItem>
                    <DropdownItem><i className="fa fa-usd" /> Payments<Badge color="secondary">42</Badge></DropdownItem>
                    <DropdownItem><i className="fa fa-file" /> Projects<Badge color="primary">42</Badge></DropdownItem>
                    <DropdownItem divider={true}/>
                    <DropdownItem><i className="fa fa-shield" /> Lock Account</DropdownItem>
                    <DropdownItem><i className="fa fa-lock" /> Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    public render (): ReactNode {
        return (
            this.dropAccnt()
        );
    }
}

export default HeaderDropdown;