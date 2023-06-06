import React from 'react';
import Loading from '../loading';

const Button: React.FC<{
  children: React.ReactNode;
  isLoading: boolean;
}> = ({ isLoading, children, ...rest }) => {
  return <button {...rest}>{isLoading ? <Loading /> : children}</button>;
};

export default Button;
