import React, { ReactNode } from "react";
import { Link, Route } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Routes from '../../app.routing';

const findRouteName = (url: string): any => Routes[url] ? Routes[url].title : console.log(url);

const getPaths = (pathname: string): any => {
    const paths = ['/'];

    if (pathname === '/') { return paths; }

    pathname.split('/').reduce((previousValue: string, currentValue: string, currentIndex: number, array: string[]): string => {
        const currPath = `${previousValue}/${currentValue}`;
        paths.push(currPath);
        return currPath;
    });
    return paths;
};

const BreadcrumbsItem = ({ match, ...rest }: any): any => {
    const routeName = findRouteName(match.url);
    if (routeName) {
        return (
            match.isExact ?
                (
                    <BreadcrumbItem active={true}>{routeName}</BreadcrumbItem>
                ) :
                (
                    <BreadcrumbItem>
                        <Link to={match.url || ''}>
                            {routeName}
                        </Link>
                    </BreadcrumbItem>
                )
        );
    }
    return null;
};

const Breadcrumbs = ({ location: { pathname }, match, ...rest }: any): ReactNode => {
    const paths = getPaths(pathname);
    const items = paths.map((path: any, i: any): ReactNode => <Route key={i++} path={path} component={BreadcrumbsItem}/>);
    return (
        <Breadcrumb>
            {items}
        </Breadcrumb>
    );
};

export default (props: any): any => (
    <div>
        <Route path="/:path" component={Breadcrumbs} {...props} />
    </div>
);
