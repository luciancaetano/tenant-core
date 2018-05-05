import React from 'react';
import * as Modules from './modules';

export default {
    '/': {
        component: Modules.HomeView,
        exact: true,
        title: 'Dashboard',
    },
};
