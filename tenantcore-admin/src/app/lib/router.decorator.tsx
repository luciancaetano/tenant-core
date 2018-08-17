import { withRouter } from "react-router-dom";

export function decorateRouter<T extends React.ComponentClass>(target: T): T {
    return withRouter<any>(target as any) as any;
}
