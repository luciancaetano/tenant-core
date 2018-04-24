import React, { Component, ReactNode } from "react";
import { DictionaryShape } from '../shapes/DictionaryShape';

/**
 * Connects a React component to a Locale Config
 * Inject component props
 *  function __(entry, ...params) : Get translation from dictionary
 *  locale: string
 * @param {*} ComponentToWrap
 */
export function locale (ComponentToWrap: any): React.ComponentType<any> {
    return class LocalizedComponent extends Component {
      public static contextTypes = {
          dictionary: DictionaryShape
      }
      public render () {
          const { dictionary } = this.context;
          return (
              <ComponentToWrap 
                locale={dictionary.locale}
                {...this.props} 
                __={dictionary.getTranslation.bind({
                  locale: dictionary.locale,
                  dictionary: dictionary.dictionary
              })}/>
          );
      }
    };
};
