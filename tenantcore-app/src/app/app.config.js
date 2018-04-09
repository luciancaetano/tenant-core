import React from 'react';
import * as reducers from './reducers';
import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ReduxDevTools } from '@luciancaetano/redux';
import { LanguageReducer } from '@luciancaetano/i18n';

/**
 * Constantes
 */
export const appTitle = "Application";
/**
 * App Footer
 */
export const appFooter = {
    link: 'http://coreui.io',
    linkText: 'AppUI',
    copyOwner: `Lucian Caetano ${(new Date()).getFullYear()}`,
    showPoweredByCoreUI: false
};
/**
 * GrapqhQL Api Url
 */
export const graphQLUrl = {
    production: 'https://luciancaetano.com/graphql',
    development: 'http://127.0.0.1/graphql'
};
/**
 * Rest Api Url
 */
export const restApiUrl = {
    production: 'https://luciancaetano.com/api',
    development: 'http://127.0.0.1/api'
};
/**
 * Retorna os reducers
 */
export const getReducers = (): any => ({
    counter: reducers.CounterReducer,
    layout: reducers.LayoutReducer,
    session: reducers.SessionReducer,
    i18n: LanguageReducer
});
/**
 * Compõe os middlewares
 */
export const composeMiddlewares = (): any => compose(
    applyMiddleware(thunk),
    (ReduxDevTools ? ReduxDevTools : (a: any): void => a)
);
