import { composeMiddlewares, getReducers } from '@app/app.config';
import { ApplicationLayout } from '@app/layout';
import * as reducers from '@app/reducers';
import { createDictionary, LocalizeProvider } from '@luciancaetano/i18n';
import React, { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';
import { enUS, ptBR } from './i18n';

const reducer = (combineReducers as any)({
    ...getReducers()
});

const store = createStore(reducer, composeMiddlewares());

export default class Store extends Component {
    public render (): ReactNode {
        return (
            <Provider store={store}>
                <LocalizeProvider
                    dictionary={createDictionary([ptBR, enUS])}
                    mapStateToProps={(state: any): any => state.i18n.locale}
                >
                    <Router>
                        <ApplicationLayout/>
                    </Router>
                </LocalizeProvider>
            </Provider>
        );
    }
}
