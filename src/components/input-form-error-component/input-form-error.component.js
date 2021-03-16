import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './input-form-error.component.scss';

const FormInputError = memo(({ error }) => {
    return error ? (
        <span className="input-form-error">{error}</span>
    ) : (
        <></>
    );
});

FormInputError.displayName = 'FormInputError';
FormInputError.propTypes = {
    error: PropTypes.string,
};

export default FormInputError;
