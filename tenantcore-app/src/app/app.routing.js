import React from 'react';
import * as Modules from './modules';
import { Locale } from '@luciancaetano/i18n';

export default {
    '/': {
        exact: true,
        component: Modules.HomeView,
        title: <Locale entry={'dashboard'}/>
    }
};
