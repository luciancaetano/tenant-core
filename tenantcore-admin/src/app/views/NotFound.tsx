import { decorateRouter } from "@app/lib";
import { IRouteProps } from "@app/types";
import notFoundSvg from "@media/not-found.svg";
import { Button, Divider, Icon } from "antd";
import * as React from "react";
import styled from "styled-components";

const CenterContent = styled.div `
  text-align: center;
`;
const NotFoundImage = styled.img `
  max-width: 100%;
`;

@decorateRouter
export default class App extends React.Component<IRouteProps> {

  public onButtonClick(e: React.MouseEvent<HTMLButtonElement>): void {
    this.props.history.push("/");
  }

  public render() {
    return (
      <CenterContent>
        <h2>404 - Page Not Found</h2>
        <NotFoundImage src={notFoundSvg}/>
        <Divider/>
        <Button onClick={(e) => this.onButtonClick(e)} icon="dashboard">Go to Dashboard</Button>
      </CenterContent>
    );
  }
}
