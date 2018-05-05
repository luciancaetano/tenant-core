import { composeMiddlewares, getReducers } from '@app/app.config';
import { ApplicationLayout } from '@app/layout';
import * as reducers from '@app/reducers';
import React, { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';

const reducer = (combineReducers as any)({
    ...getReducers(),
});

const store = createStore(reducer, composeMiddlewares());

export default class Store extends Component {
    public render (): ReactNode {
        return (
            <Provider store={store}>
                <Router>
                    <ApplicationLayout/>
                </Router>
            </Provider>
        );
    }
}
