import React, { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { getReducers, composeMiddlewares } from 'app/app.config';
import * as reducers from 'app/reducers';
import { ApplicationLayout } from 'app/layout';
import { HashRouter as Router } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { createDictionary, LocalizeProvider } from '@luciancaetano/i18n';
import { ptBR, enUS } from './i18n';

const reducer = combineReducers({
    ...getReducers(reducers)
});

const store = createStore(reducer, composeMiddlewares());

export default class Store extends Component {
    render (): ReactNode {
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
