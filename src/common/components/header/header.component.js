import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import logoSvg from '../../assets/svg/logo.svg';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { AuthContext } from '../../contexts/auth';

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
            <AiOutlineMenu
              className="cursor-pointer md:hidden"
              size={28}
              onClick={() => setIsMenuOpen(true)}
            />
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

      {/* {AUTH_STATE.isAuthenticated && (
        <div>
          <div
            className={`fixed h-screen w-full bg-slate-800 top-0 left-0 transition-all duration-300 ${
              isOpen ? 'opacity-60 visible' : 'opacity-0 invisible'
            }`}
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className={`fixed h-screen right-0 top-0 w-64 bg-white transition-all duration-300 ${
              isOpen ? 'visible translate-x-0' : 'invisible translate-x-64'
            }`}
          >
            <ul className="p-4 pb-0">
              {AUTH_STATE.isProfessional && (
                <Fragment>
                  {Object.entries(professionalMenu).map(([category, menu]) => (
                    <li
                      key={category}
                      className="mb-4 border divide-solid border-stone-200 rounded-xl p-4"
                    >
                      <span className="text-md font-semibold">{category}</span>
                      <ul>
                        {menu
                          .filter((menuIem) => !menuIem.isUnavailable)
                          .map(({ name, link }) => (
                            <li key={name} className="mt-1">
                              <Link to={link} onClick={() => setIsOpen(false)}>
                                - {name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </Fragment>
              )}

              {AUTH_STATE.isCustomer && (
                <Fragment>
                  {Object.entries(customerMenu).map(([category, menu]) => (
                    <li
                      key={category}
                      className="mb-4 border divide-solid border-stone-200 rounded-xl p-4"
                    >
                      <span className="text-md font-semibold">{category}</span>
                      <ul>
                        {menu
                          .filter((menuIem) => !menuIem.isUnavailable)
                          .map(({ name, link }) => (
                            <li key={name} className="mt-1">
                              <Link to={link} onClick={() => setIsOpen(false)}>
                                - {name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </Fragment>
              )}
            </ul>
            <div className="px-4">
              <Button
                type="button"
                className="button button--primary"
                onClick={headerSignOut}
              >
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

Header.propTypes = {
  currentPathname: PropTypes.string,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default Header;
