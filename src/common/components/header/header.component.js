import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import logoSvg from '../../assets/svg/logo.svg';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { AuthContext } from '../../contexts/auth';
import PlanRemainingDays from '../plan-remaining-days';

const Header = ({ currentPathname, setIsMenuOpen }) => {
  const { AUTH_STATE } = useContext(AuthContext);

  const allowProfessionalLink = (path) => {
    return (
      !AUTH_STATE.isAuthenticated &&
      !['/sign-in', '/recover-password', '/reset-password'].some((state) =>
        path.includes(state),
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

          {AUTH_STATE.isAuthenticated ? (
            <div className="flex">
              <div className="mt-1 text-sm">
                <PlanRemainingDays
                  userCompany={AUTH_STATE.userCompany}
                  onlyRemainingDays
                />
              </div>
              <AiOutlineMenu
                className="cursor-pointer md:hidden ml-2"
                size={28}
                onClick={() => setIsMenuOpen(true)}
              />
            </div>
          ) : (
            <Fragment>
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
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  currentPathname: PropTypes.string,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default Header;
