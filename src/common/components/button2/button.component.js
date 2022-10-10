import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading';

const Button = ({ isLoading, children, ...rest }) => {
  return <button {...rest}>{isLoading ? <Loading /> : children}</button>;
};

Button.propTypes = {
  children: PropTypes.element.isRequired,
  isLoading: PropTypes.bool,
};

Button.displayName = 'Button';
export default Button;
