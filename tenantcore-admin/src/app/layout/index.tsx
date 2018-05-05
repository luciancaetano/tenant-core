import React, { Component, ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { appTitle } from '../app.config';
import decorate from '../app.decorators';
import Routes from '../app.routing';
import { LoginView } from '../modules/login';
import { NotFoundComponent } from '../modules/notfound';
import navigation from '../app.nav';


const Content = (): any => {
    return (
        <Switch>
            {Object.keys(Routes).map((key: string, index: number): ReactNode => {
                const route = Routes[key];
                return <Route
                    key={index}
                    exact={route.exact}
                    path={key}
                    render={props => <route.component {...props} />}
                />;
            })}
            <Route component={NotFoundComponent} />
        </Switch>
    );
};

@decorate
export class ApplicationLayout extends Component<any, any, any> {
    constructor(props: any, ctx: any) {
        super(props, ctx);
        document.title = appTitle;
    }
    get loggedIn(): boolean {
        return this.props.state.session.isAuthenticated;
    }
    public render() {
        if (!this.loggedIn) {
            return <LoginView />;
        }
        return (
            <div className="app">
                <Content />
            </div>
        );
    }
}
