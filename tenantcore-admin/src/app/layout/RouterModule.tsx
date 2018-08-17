import modules from "@app/app.modules";
import routes from "@app/app.routing";
import { IModuleRouterConfig, IRouterConfigEntry } from "@app/types";
import NotFound from "@app/views/NotFound";
import React, { StrictMode } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { HashRouter, Route, Switch } from "react-router-dom";

const transitionConfig = {
    transitionAppear: true,
    transitionAppearTimeout: 600,
    transitionEnterTimeout: 600,
    transitionLeaveTimeout: 200,
    transitionName: "SlideIn",
};

const mapModules = (moduleConf: IModuleRouterConfig, index: number) =>
    Object.keys(moduleConf.routes).map(
        (path: string) => {
            const prepend = moduleConf.prepend && String(moduleConf).trim().length > 0 ? moduleConf.prepend : false;
            const routeProps: IRouterConfigEntry = moduleConf.routes[path];
            if (routeProps.exact === null || routeProps.exact === undefined) {
                routeProps.exact = true;
            }
            const RendeComponent: any = routeProps.component;

            const renderView = (props: any) => (
                <ReactCSSTransitionGroup {...transitionConfig}>
                    {typeof routeProps.render === "function" ? routeProps.render(props) : <RendeComponent />}
                </ReactCSSTransitionGroup>
            );

            return (
                <Route
                    path={`${prepend || ""}${path}`}
                    key={`${index}-${prepend || ""}${path}`}
                    exact={routeProps.exact}
                    sensitive={routeProps.sensitive || false}
                    strict={routeProps.strict || false}
                    render={renderView}
                />
            );
        },
    );

const mapRoutes = (path: string, index: number) => {
    const routeProps: IRouterConfigEntry = routes[path];
    if (routeProps.exact === null || routeProps.exact === undefined) {
        routeProps.exact = true;
    }

    const RendeComponent: any = routeProps.component;

    const renderView = (props: any) => (
        <ReactCSSTransitionGroup {...transitionConfig}>
            {typeof routeProps.render === "function" ? routeProps.render(props) : <RendeComponent />}
        </ReactCSSTransitionGroup>
    );

    return (
        <Route
            path={path}
            key={`${index}-${path}`}
            exact={routeProps.exact}
            sensitive={routeProps.sensitive || false}
            strict={routeProps.strict || false}
            render={renderView}
        />
    );
};

export default ({ }: any) => (
    <HashRouter>
        <Switch>
            {modules.map(mapModules)}
            {Object.keys(routes).map(mapRoutes)}
            <Route component={NotFound} />
        </Switch>
    </HashRouter>
);
