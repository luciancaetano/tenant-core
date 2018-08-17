/// <reference path='./index.d.ts'/>
import React from "react";
import ReactDOM from "react-dom";
import ApplicationEntry from "./configurestore";

// Import Global Styles
import "antd/dist/antd.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "typeface-roboto";
import "./styles/index.scss";

ReactDOM.render(
  <ApplicationEntry/>,
  document.getElementById("root") as HTMLElement,
);
