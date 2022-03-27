import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import logoSvg from '../../assets/svg/logo.svg';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { AuthContext } from '../../contexts/auth';
import './header.component.scss';

const Header = ({ currentPathname }) => {
  const { AUTH_STATE, AUTH_DISPATCH, AUTH_ACTIONS } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const headerSignOut = () => {
    AUTH_DISPATCH({
      type: AUTH_ACTIONS.SET_SIGN_OUT,
    });

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

          {AUTH_STATE.isAuthenticated && (
            <AiOutlineMenu
              className="header__toggle"
              onClick={() => setIsOpen(true)}
            />
          )}

          {!AUTH_STATE.isAuthenticated &&
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

          {!AUTH_STATE.isAuthenticated &&
            ['/sign-in'].includes(currentPathname) && (
              <Link to={`/customer-sign-in`} className="header__action">
                Sou cliente
              </Link>
            )}

          {!AUTH_STATE.isAuthenticated &&
            ['/customer-sign-in'].includes(currentPathname) && (
              <Link to={`/sign-in`} className="header__action">
                Sou profissional
              </Link>
            )}
        </div>
      </div>

      {AUTH_STATE.isAuthenticated && (
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
              {AUTH_STATE.isProfessional && (
                <Fragment>
                  <li>
                    <strong>Agenda</strong>
                    <ul className="m-t-10">
                      <li>
                        <Link
                          to={`/${AUTH_STATE.userCompany.url}`}
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
                    <strong>Finanças</strong>
                    <ul className="m-t-10">
                      <li>
                        <Link to="/statistics" onClick={() => setIsOpen(false)}>
                          Relatórios
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
                      {AUTH_STATE.userCompany.plan === 'CUSTOM' && (
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

              {AUTH_STATE.isCustomer && (
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
