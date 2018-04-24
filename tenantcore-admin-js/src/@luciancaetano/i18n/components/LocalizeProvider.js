import React, { Component, Children } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DictionaryShape } from '../shapes/DictionaryShape';

/**
 * Make localization api avaliable to @locale decorator
 */
@connect((state: any): any => ({ state: state }))
export class LocalizeProvider extends Component {
  static propTypes = {
      /**
     * Dictionary generate by createDictionary helper
     */
      dictionary: DictionaryShape,
      /**
     * Function that return current locale from state
     */
      mapStateToProps: PropTypes.func
  };

  constructor (props: any, context: any) {
      super(props, context);
  }

  getChildContext (): any {
      let { dictionary, mapStateToProps, state } = this.props;

      let locale = mapStateToProps ?
          mapStateToProps :
          (state: any): any => state.i18n.locale;

      return {
          dictionary: {
              ...dictionary,
              locale: locale(state)
          }
      };
  }
  static childContextTypes = {
      dictionary: DictionaryShape
  };
  /**
     *
     */
  render = (): ReactNode => {
      return Children.only(this.props.children);
  }
}
