import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';

import './input-form-error.component.scss';

const InputFormError = memo(({ error, touched }) => {
  return (
    <Fragment>
      {touched && error?.message && (
        <span className="input-form-error">{error.message}</span>
      )}
    </Fragment>
  );
});

InputFormError.propTypes = {
  field: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.object,
};

InputFormError.displayName = 'InputFormError';
export default InputFormError;
