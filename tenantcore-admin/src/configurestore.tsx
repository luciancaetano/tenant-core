import config from "@app/app.config";
import ApplicationLayout from "@app/layout";
import * as reducers from "@app/reducers";
import { client as apolloClient } from "@app/services/graphql";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { LocaleProvider } from "antd";
import pt_BR from "antd/lib/locale-provider/pt_BR";
import "moment/locale/pt-br";
import React, { Component, ReactNode } from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { combineReducers, createStore } from "redux";
import { ThemeProvider } from "styled-components";

const reducer = (combineReducers as any)({
  ...config.getReducers(),
});

const store = createStore(reducer, config.composeMiddlewares());

export default class Store extends Component {
  public render(): ReactNode {
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <LocaleProvider locale={pt_BR}>
            <ThemeProvider theme={config.themeOptions}>
              <Router>
                <ApplicationLayout />
              </Router>
            </ThemeProvider>
          </LocaleProvider>
        </Provider>
      </ApolloProvider>
    );
  }
}
