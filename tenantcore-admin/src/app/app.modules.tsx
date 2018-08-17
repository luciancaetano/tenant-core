import DashboardModule from "@app/modules/dashboard";
import KanbanModule from "@app/modules/kanban";
import { IModuleRouterConfig } from "@app/types";

const Modules: IModuleRouterConfig[] = [
    DashboardModule,
    KanbanModule,
];

export default Modules;
