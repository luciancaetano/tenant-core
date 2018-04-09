export { connect as connectRedux } from 'react-redux';
export { connectModal } from 'redux-modal';
export { locale } from '@luciancaetano/i18n';
export { withRouter } from 'react-router-dom';

import { locale } from '@luciancaetano/i18n';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export function redux (target: any): any {
    return connect(
        (state: any, props: any): void => ({ state: state }),
        (dispatch: Function): any => ({ dispatch: dispatch })
    )(target);
}

export function bindDispatch (target: any): any {
    target.prototype.dispatch = function (action: any): any {
        return this.props.dispatch(action);
    };
    return target;
}

export default (target: any): any => withRouter(locale(redux(target)));
