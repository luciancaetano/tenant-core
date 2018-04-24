import { LanguageReducer } from '@luciancaetano/i18n';
import { ReduxDevTools } from '@luciancaetano/redux';
import React from 'react';
import { applyMiddleware, compose } from 'redux';
import * as reducers from './reducers';

/**
 * Constantes
 */
export const appTitle = "Application";
/**
 * App Footer
 */
export const appFooter = {
    copyOwner: `Lucian Caetano ${(new Date()).getFullYear()}`,
    link: 'http://coreui.io',
    linkText: 'AppUI',
    showPoweredByCoreUI: false
};
/**
 * GrapqhQL Api Url
 */
export const graphQLUrl:{production: string, development: string } = {
    development: 'http://127.0.0.1/graphql',
    production: 'https://luciancaetano.com/graphql'
};
/**
 * Rest Api Url
 */
export const restApiUrl:{production: string, development: string } = {
    development: 'http://127.0.0.1/api',
    production: 'https://luciancaetano.com/api'    
};
/**
 * Retorna os reducers
 */
export const getReducers = (): any => ({
    counter: reducers.CounterReducer,
    i18n: LanguageReducer,
    layout: reducers.LayoutReducer,
    session: reducers.SessionReducer,
});
/**
 * Compõe os middlewares
 */
export const composeMiddlewares = (): any => compose(
    (ReduxDevTools ? ReduxDevTools : () => {/**/})
);
