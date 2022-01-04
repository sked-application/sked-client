import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import logoSvg from '../../assets/svg/logo.svg';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { AuthContext } from '../../contexts/auth';
import './header.component.scss';

const Header = ({ currentPathname }) => {
  const AUTH = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const headerSignOut = () => {
    AUTH.handleSignOut();
    setIsOpen(false);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <div>
            <span className="header__logo">
              <img src={logoSvg} alt="Logo Sked App" />
            </span>
          </div>

          {AUTH.isAuthenticated && (
            <AiOutlineMenu
              className="header__toggle"
              onClick={() => setIsOpen(true)}
            />
          )}

          {!AUTH.isAuthenticated &&
            ![
              '/sign-in',
              '/customer-sign-in',
              '/sign-up',
              '/recover-password',
              '/reset-password',
            ].some((state) => currentPathname.includes(state)) && (
              <Link to={`/sign-in`} className="header__action">
                Sou profissional
              </Link>
            )}

          {!AUTH.isAuthenticated && ['/sign-in'].includes(currentPathname) && (
            <Link to={`/customer-sign-in`} className="header__action">
              Sou cliente
            </Link>
          )}

          {!AUTH.isAuthenticated &&
            ['/customer-sign-in'].includes(currentPathname) && (
              <Link to={`/sign-in`} className="header__action">
                Sou profissional
              </Link>
            )}
        </div>
      </div>

      {AUTH.isAuthenticated && (
        <div>
          <div
            className={`header__overlay ${
              isOpen ? 'header__overlay--active' : ''
            }`}
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className={`header__menu ${isOpen ? 'header__menu--active' : ''}`}
          >
            <ul className="header__list">
              {AUTH.isProfessional && (
                <Fragment>
                  <li>
                    <strong>Agenda</strong>
                    <ul className="m-t-10">
                      <li>
                        <Link
                          to={`/${AUTH.userCompany.url}`}
                          onClick={() => setIsOpen(false)}
                        >
                          Minha página
                        </Link>
                      </li>
                      <li>
                        <Link to="/schedules" onClick={() => setIsOpen(false)}>
                          Agendamentos
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Configurações</strong>
                    <ul className="m-t-10">
                      <li>
                        <Link to="/services" onClick={() => setIsOpen(false)}>
                          Serviços
                        </Link>
                      </li>
                      {AUTH.userCompany.plan === 'CUSTOM' && (
                        <li>
                          <Link
                            to="/professionals"
                            onClick={() => setIsOpen(false)}
                          >
                            Profissionais
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to="/settings" onClick={() => setIsOpen(false)}>
                          Grade de horários
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/schedule-locks"
                          onClick={() => setIsOpen(false)}
                        >
                          Bloqueio de agenda
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile" onClick={() => setIsOpen(false)}>
                          Perfil
                        </Link>
                      </li>
                    </ul>
                  </li>
                </Fragment>
              )}

              {AUTH.isCustomer && (
                <Fragment>
                  <li>
                    <Link to="/favorites" onClick={() => setIsOpen(false)}>
                      Favoritos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customer-schedules"
                      onClick={() => setIsOpen(false)}
                    >
                      Meus compromissos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customer-profile"
                      onClick={() => setIsOpen(false)}
                    >
                      Perfil
                    </Link>
                  </li>
                </Fragment>
              )}

              <li>
                <button
                  className="button button--purple"
                  onClick={headerSignOut}
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  currentPathname: PropTypes.string,
};

export default Header;
