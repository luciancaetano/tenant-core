import React, { Component, ReactNode } from "react";
import "./app.css";
import decorate, { bindDispatch } from 'app/app.decorators';
import { localePtBR, localeEnUS } from 'app/actions/layout.actions';

@decorate
@bindDispatch
export class HomeView extends Component {
    render (): ReactNode {
        const { locale } = this.props;
        return (
            <div>
                {locale}
                <button onClick={(): void => this.dispatch(localePtBR())}>pt-BR</button>
                <button onClick={(): void => this.dispatch(localeEnUS())}>en-US</button>
            </div>
        );
    }
}
