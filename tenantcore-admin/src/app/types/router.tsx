import {RouteComponentProps} from "react-router-dom";

export interface IRouterConfigEntry {
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: ((props: RouteComponentProps<any>) => React.ReactNode);
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
}

export interface IRouterConfig {
    [path: string]: IRouterConfigEntry;
}

export interface IModuleRouterConfig {
    prepend: string | null | false | undefined;
    routes: {
        [path: string]: IRouterConfigEntry;
    };
}
