import { connectAllState } from "@app.lib";
import React from "react";
import styled from "styled-components";

const DashboardLogoContainer = styled.div`
    float: left;
    width: 100%;
    height: 64px;
`;

export const DashboardLogo = connectAllState(() => (
    <DashboardLogoContainer />
));
