import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './input-form-error.scss';

const MemoizedFormInputError = ({ touched, error }) => {
    return touched && error ? (
        <span className="input-form-error">{error}</span>
    ) : (
        <></>
    );
};

MemoizedFormInputError.propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.string,
};

export const FormInputError = memo(MemoizedFormInputError);
