import decorate from '@app/app.decorators';
import React, { Component } from 'react';
import './app.css';

@decorate
export class HomeView extends Component<any, any, any> {
    public render () {
        return (
            <div>
                ...
            </div>
        );
    }
}
