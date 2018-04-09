import getTranslationImpl from './_get_translation_impl';
import { ReactNode } from 'react';

export interface IDictionaryEntry{

        lang_id: string,
        label: string,
        data: {
            [key: string]: ReactNode
        }
}
/**
 * Create a dictionary for Localize
 * @param {*} languages
 */
export const createDictionary = (languages: Array<IDictionaryEntry>): any => {
    let languageDicts = {};

    languages.forEach((lang: any) => {
        Object.assign(languageDicts, {
            [lang.lang_id]: lang.data
        });
    });

    return {
        locale: 'pt-BR',
        dictionary: languageDicts,
        getTranslation: function (entry: string, ...args: Array): ReactNode {
            let { locale, dictionary } = this;
            return getTranslationImpl(dictionary, locale, entry, args);
        }
    };
};
