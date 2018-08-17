import React from "react";
import {connect} from "react-redux";
import {ConfigProps, reduxForm as oldReduxForm} from "redux-form";

export function connectAllState<T extends React.ComponentClass>(target: T | ((props: any) => any)): T {
    return connect((state) => ({state}))(target as any) as any;
}

export function reduxForm(config: ConfigProps<any>) {
    return <T extends React.ComponentClass>(target: T): T => {
        return oldReduxForm(config)(target as any) as any;
    };
}

export function mapStateToProps(map: (state: any) => any) {
    return <T extends React.ComponentClass>(target: T): T => {
        return connect(map)(target) as any;
    };
}
