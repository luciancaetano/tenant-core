import { localeEnUS, localePtBR } from '@app/actions/layout.actions';
import decorate from '@app/app.decorators';
import React, { Component } from "react";
import "./app.css";

@decorate
export class HomeView extends Component<any, any, any> {
    public render () {
        const { locale, dispatch } = this.props;
        return (
            <div>
                {locale}
                <button onClick={(): void => dispatch(localePtBR())}>pt-BR</button>
                <button onClick={(): void => dispatch(localeEnUS())}>en-US</button>
            </div>
        );
    }
}
