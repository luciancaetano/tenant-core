import PropTypes from 'prop-types';

export const DictionaryShape = PropTypes.shape({
    locale: PropTypes.string,
    dictionary: PropTypes.object.isRequired,
    getTranslation: PropTypes.func.isRequired
}).isRequired;
