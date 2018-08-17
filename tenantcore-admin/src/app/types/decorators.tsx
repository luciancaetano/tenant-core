import { RouteComponentProps } from "react-router-dom";
import { ConfigProps } from "redux-form";

export interface IRouteProps extends RouteComponentProps<any> {}
export interface IFormProps<T> extends ConfigProps<T> {}
