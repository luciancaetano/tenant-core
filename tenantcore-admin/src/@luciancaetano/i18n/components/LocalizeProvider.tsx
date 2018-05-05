import * as PropTypes from 'prop-types';
import React, { Children, Component } from "react";
import { connect } from "react-redux";
import { DictionaryShape } from '../shapes/DictionaryShape';
const uConnect:any = connect;
/**
 * Make localization api avaliable to @locale decorator
 */
@uConnect((state: any): any => ({ state }))
export class LocalizeProvider extends Component<any, any, any> {
  public static propTypes = {
    /**
     * Dictionary generate by createDictionary helper
     */
      dictionary: DictionaryShape,
    /**
     * Function that return current locale from state
     */
      mapStateToProps: PropTypes.func
  };
  public static childContextTypes = {
    dictionary: DictionaryShape
};

  constructor (props: any, context: any) {
      super(props, context);
  }

  public getChildContext (): any {
      const { dictionary, mapStateToProps, state } = this.props;

      const locale = mapStateToProps ?
          mapStateToProps :
          (s: any): any => s.i18n.locale;

      return {
          dictionary: {
              ...dictionary,
              locale: locale(state)
          }
      };
  }
  
  public render() {
      return Children.only(this.props.children);
  }
}
