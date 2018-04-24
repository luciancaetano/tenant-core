import React, { Component, ReactNode } from "react";
import { appFooter } from '../../app.config';

class Footer extends Component {
    public render (): ReactNode {
        return (
            <footer className="app-footer">
                <span><a href={appFooter.link}>{appFooter.linkText}</a> &copy; {appFooter.copyOwner}.</span>
                {appFooter.showPoweredByCoreUI && <span className="ml-auto">Powered by <a href="http://coreui.io">CoreUI</a></span>}
            </footer>
        );
    }
}

export default Footer;
