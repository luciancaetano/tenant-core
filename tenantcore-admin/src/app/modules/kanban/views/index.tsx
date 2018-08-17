import { connectAllState, decorateRouter } from "@app.lib";
import { Grid, Paper } from "@material-ui/core";
import { IFormProps, IRouteProps } from "@types";
import * as React from "react";
import "./index.scss";

@connectAllState
@decorateRouter
export default class extends React.PureComponent<any & IRouteProps & IFormProps<any>, {}> {
  public render() {
    const { dispatch, state } = this.props;
    return (
      <div className="app-container-flex">
        Kanban content
      </div>
    );
  }
}
