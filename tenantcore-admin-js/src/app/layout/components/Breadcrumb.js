import React, { ReactNode } from "react";
import { Route, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Routes from '../../app.routing';

const findRouteName = (url: string): void => Routes[url] ? Routes[url].title : console.log(url);

const getPaths = (pathname: string): any => {
    const paths = ['/'];

    if (pathname === '/') return paths;

    pathname.split('/').reduce((prev: any, curr: any, index: number): void => {
        const currPath = `${prev}/${curr}`;
        paths.push(currPath);
        return currPath;
    });
    return paths;
};

const BreadcrumbsItem = ({ match, ...rest }: any): void => {
    const routeName = findRouteName(match.url);
    if (routeName) {
        return (
            match.isExact ?
                (
                    <BreadcrumbItem active>{routeName}</BreadcrumbItem>
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
    const items = paths.map((path: any, i: index): ReactNode => <Route key={i++} path={path} component={BreadcrumbsItem}/>);
    return (
        <Breadcrumb>
            {items}
        </Breadcrumb>
    );
};

export default (props: any): ReactNode => (
    <div>
        <Route path="/:path" component={Breadcrumbs} {...props} />
    </div>
);
