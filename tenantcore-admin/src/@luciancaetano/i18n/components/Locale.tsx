import * as PropTypes from 'prop-types';
import React, { Component, ReactNode } from "react";
import { DictionaryShape } from '../shapes/DictionaryShape';
import getTranslationImpl from '../utils/locale_get_translation_impl';


/**
 * Inject an react element or string from dictionary
 */
export class Locale extends Component<any, any, any> {
  public static propTypes = {
      entry: PropTypes.string
  };
  public static contextTypes = {
    dictionary: DictionaryShape
  };
  constructor (props: any, context: any) {
      super(props, context);
  }

  
  /**
   * Render the component
   */
  public render() {
      const { dictionary } = this.context;
      const { entry } = this.props;
      return getTranslationImpl(dictionary.dictionary, dictionary.locale, entry, this.props);
  }
}
