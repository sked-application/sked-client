import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ isLoading, children, ...rest }) => {
  return (
    <button {...rest}>
      {isLoading ? <div className="loading"></div> : <span>{children}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.element.isRequired,
  isLoading: PropTypes.bool,
};

Button.displayName = 'Button';
export default Button;
