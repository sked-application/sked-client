import { ErrorMessage } from '@hookform/error-message';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const Input = forwardRef(({ errors, fieldName, ...rest }, ref) => {
  return (
    <Fragment>
      <input {...rest} ref={ref} />
      {errors && (
        <ErrorMessage
          errors={errors}
          name={fieldName}
          render={({ message }) => (
            <div className="text-red-500 text-sm mt-2">{message}</div>
          )}
        />
      )}
    </Fragment>
  );
});

Input.propTypes = {
  errors: PropTypes.object,
  fieldName: PropTypes.string,
};

Input.displayName = 'Input';
export default Input;
