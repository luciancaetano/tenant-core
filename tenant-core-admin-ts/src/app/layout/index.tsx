import React, { Component, ReactNode } from "react";
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { appTitle } from '../app.config';
import decorate from '../app.decorators';
import Routes from "../app.routing";
import { LoginView } from '../modules/login';
import { NotFoundComponent } from '../modules/notfound';
import Breadcrumb from './components/Breadcrumb';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';


const Content = (): any => {
    return (
        <Switch>
            { Object.keys(Routes).map((key: string, index: number): ReactNode => {
                const route = Routes[key];
                return <Route key={index} exact={route.exact} path={key} component={route.component} />;
            })}
            <Route component={NotFoundComponent} />
        </Switch>
    );
};

@decorate
export class ApplicationLayout extends Component<any, any, any> {
    constructor (props: any, ctx: any) {
        super(props, ctx);
        document.title = appTitle;
    }
    get loggedIn (): boolean {
        return this.props.state.session.isAuthenticated;
    }
    public render () {
        if (!this.loggedIn) {
            return <LoginView/>;
        }
        return (
            <div>
                <div className="app">
                    <Header />
                    <div className="app-body">
                        <Sidebar {...this.props}/>
                        <main className="main">
                            <Breadcrumb/>
                            <Container fluid={true}>
                                <Content />
                            </Container>
                        </main>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
