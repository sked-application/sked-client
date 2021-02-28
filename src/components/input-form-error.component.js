import React, { memo } from 'react';
import PropTypes from 'prop-types';

const MemoizedFormInputError = ({ error }) => {
    return error ? (
        <span className="input-form-error">{error}</span>
    ) : (
        <></>
    );
};

MemoizedFormInputError.propTypes = {
    error: PropTypes.string,
};

export const FormInputError = memo(MemoizedFormInputError);