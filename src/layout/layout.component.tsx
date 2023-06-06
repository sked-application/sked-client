import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../shared/components/header';
import Sidebar from '../shared/components/sidebar/sidebar.component';
import Copyright from '../shared/components/copyright';
import { allowHeader } from './layout.utils';
import { LayoutContext } from '../contexts/layout';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { LAYOUT_PROVIDER } = React.useContext(LayoutContext);
  // const [currentPathname, setCurrentPathname] = useState<string>('');
  // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    LAYOUT_PROVIDER.dispatch({
      type: LAYOUT_PROVIDER.actions.SET_CURRENT_PATHNAME,
      value: { currentPathname: location.pathname },
    });
  }, [location.pathname, LAYOUT_PROVIDER]);

  return (
    <div>
      {allowHeader(LAYOUT_PROVIDER.state.currentPathname) && (
        <Header
          currentPathname={LAYOUT_PROVIDER.state.currentPathname}
          setIsMenuOpen={LAYOUT_PROVIDER.actions.SET_IS_MENU_OPEN}
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

export default Layout;
