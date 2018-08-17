import { IModuleRouterConfig } from "@app/types";
import Index from "./views/index";

const ModuleConfig: IModuleRouterConfig = {
    prepend: "/kanban",
    routes: {
        "/all": {
            component: Index,
            exact: true,
        },
    },
};

export default ModuleConfig;
