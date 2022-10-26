import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from '../header';
import Sidebar from '../sidebar/sidebar.component';
import Copyright from '../copyright';

const Layout = ({ children }) => {
  const [currentPathname, setCurrentPathname] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const allowHeader = (pathname) => {
    return ['/sign-up'].every((route) => pathname.indexOf(route) === -1);
  };

  useEffect(() => {
    setCurrentPathname(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      {allowHeader(currentPathname) && (
        <Header
          currentPathname={currentPathname}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
      <div className="container mx-auto max-w-screen-lg">
        <div className="float-left">
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
        <div className="flex flex-col">
          <div className="flex-1">{children}</div>
          <Copyright />
        </div>
      </div>
    </div>
  );
};

Layout.displayName = 'Layout';
Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
