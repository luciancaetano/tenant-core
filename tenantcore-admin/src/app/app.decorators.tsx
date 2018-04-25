export { connect as connectRedux } from 'react-redux';
export { locale } from '@luciancaetano/i18n';
export { withRouter } from 'react-router-dom';
import { locale } from '@luciancaetano/i18n';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

export function redux (target: any): any {
    return connect(
        (state: any, props: any): any => ({ state }),
        (dispatch: Dispatch<any>): any => ({ dispatch })
    )(target);
}

export function bindDispatch (target: any): any {
    target.prototype.dispatch = function (action: any): any {
        return this.props.dispatch(action);
    };
    return target;
}

export default (target: any): any => withRouter(locale(redux(target)));
