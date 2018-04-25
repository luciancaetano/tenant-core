import React, { ReactNode } from 'react';
import getTranslationImpl from './_get_translation_impl';

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
    const languageDicts = {};

    languages.forEach((lang: any) => {
        Object.assign(languageDicts, {
            [lang.lang_id]: lang.data
        });
    });

    return {
        locale: 'pt-BR',
        dictionary: languageDicts,
        getTranslation: function (entry: string, ...args: Array<any>): ReactNode {
            const { locale, dictionary } = this;
            return getTranslationImpl(dictionary, locale, entry, args);
        }
    };
};
