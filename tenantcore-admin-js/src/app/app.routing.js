import React, { ReactNode } from 'react';
import * as Modules from './modules';
import { Locale } from '@luciancaetano/i18n';

interface IRoutingEntry{
    exact: boolean;
    component: ReactNode;
    title: ReactNode;
}
export interface IRoutingType{
    [key:string]: IRoutingEntry;
}

const routes:IRoutingType = {
    '/': {
        exact: true,
        component: Modules.HomeView,
        title: <Locale entry={'dashboard'}/>
    }
}

export default routes;
