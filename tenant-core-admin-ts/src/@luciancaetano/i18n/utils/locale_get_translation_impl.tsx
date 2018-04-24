import React from 'react';
/**
 * Implement function translation
 */
export default (dictionary: any, locale: string, entry: string, args: Array<any> | any): any => {
    const currentLocale = dictionary[locale];


    if (!currentLocale) {
        throw new Error(`Locale ${locale} not found on dict.`);
    }

    const entryValue = currentLocale[entry];

    if (entryValue === undefined) {
        throw new Error(`Key ${entry} not found on locale ${locale}.`);
    }

    if (typeof entryValue === 'function') {
        const result = entryValue.call({}, args);
        if (typeof result !== 'string' && !React.isValidElement(result)) {
            throw new Error(`Locale entry ${locale}.data.${entry} should return a string or React component.`);
        }

        return result;
    } else if (typeof entryValue === 'string') {
        return entryValue;
    } else if (React.isValidElement(entryValue)) {
        return entryValue;
    } else {
        throw new Error(`Locale entry ${locale}.data.${entry} must be a string or React component.`);
    }
};
