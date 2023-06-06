import React from 'react';
import logoSvg from '../../../assets/svg/logo.svg';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { AuthContext } from '../../../contexts/auth';
import PlanRemainingDays from '../plan-remaining-days';

const Header: React.FC<{
  currentPathname: string;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ currentPathname, setIsMenuOpen }) => {
  const { AUTH_PROVIDER } = React.useContext(AuthContext);

  const allowProfessionalLink = (pathname: string): boolean => {
    return (
      !AUTH_PROVIDER.state.isAuthenticated &&
      !['/sign-in', '/recover-password', '/reset-password'].some((state) =>
        pathname.includes(state),
      )
    );
  };

  return (
    <div>
      <div className="container mx-auto p-4 max-w-screen-lg">
        <div className="flex justify-between items-center">
          <span>
            <img src={logoSvg} alt="Logo Sked App" />
          </span>

          {AUTH_PROVIDER.state.isAuthenticated ? (
            <div className="flex">
              {AUTH_PROVIDER.state.userCompany && (
                <div className="mt-1 text-sm">
                  <PlanRemainingDays
                    userCompany={AUTH_PROVIDER.state.userCompany}
                    onlyRemainingDays
                  />
                </div>
              )}
              <AiOutlineMenu
                className="cursor-pointer md:hidden ml-2"
                size={28}
                onClick={() => setIsMenuOpen(true)}
              />
            </div>
          ) : (
            <React.Fragment>
              {allowProfessionalLink(currentPathname) && (
                <Link
                  to="/sign-in"
                  className="underline font-semibold underline-offset-4"
                >
                  Sou profissional
                </Link>
              )}

              {['/sign-in'].includes(currentPathname) && (
                <Link
                  to="/customer-sign-in"
                  className="underline font-semibold underline-offset-4"
                >
                  Sou cliente
                </Link>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
