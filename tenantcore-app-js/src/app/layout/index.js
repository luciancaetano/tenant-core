import Routes from "../app.routing";
import React, { Component, ReactNode } from "react";
import decorate from '../app.decorators';
import { Container } from 'reactstrap';
import { appTitle } from '../app.config';
import { Route, Switch } from 'react-router-dom';
import { NotFoundComponent } from '../modules/notfound';
import { LoginView } from '../modules/login';


const Content = (): ReactNode => {
    return (
        <Switch>
            { Object.keys(Routes).map((key: string, index: number): ReactNode => {
                let route = Routes[key];
                return <Route key={index} exact={route.exact} path={key} component={route.component} />;
            })}
            <Route component={NotFoundComponent} />
        </Switch>
    );
};

@decorate
export class ApplicationLayout extends Component {
    constructor (props: any, ctx: any) {
        super(props, ctx);
        document.title = appTitle;
    }
    get loggedIn (): boolean {
        return this.props.state.session.isAuthenticated;
    }
    render (): ReactNode {
        if (!this.loggedIn) {
            return <LoginView/>;
        }
        return (
            <Container fluid>
                <Content />
            </Container>
        );
    }
}
