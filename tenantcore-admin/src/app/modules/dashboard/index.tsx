import { IModuleRouterConfig } from "@app/types";
import DashboardView from "./views/index";

const ModuleConfig: IModuleRouterConfig = {
    prepend: null,
    routes: {
        "/": {
            component: DashboardView,
            exact: true,
        },
    },
};

export default ModuleConfig;
