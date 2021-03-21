import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { AuthContext } from '../../contexts/auth';

import './header.component.scss';

const Header = ({ currentPathname }) => {
  const { isAuthenticated, handleSignOut, userAccountUrl } = useContext(
    AuthContext,
  );
  const [isOpen, setIsOpen] = useState(false);

  const headerSignOut = () => {
    handleSignOut();
    setIsOpen(false);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <div>
            <span className="header__logo">SKED</span>
          </div>

          {isAuthenticated && (
            <AiOutlineMenu
              className="header__toggle"
              onClick={() => setIsOpen(true)}
            />
          )}

          {!isAuthenticated &&
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

          {!isAuthenticated && ['/sign-in'].includes(currentPathname) && (
            <Link to={`/customer-sign-in`} className="header__action">
              Sou cliente
            </Link>
          )}

          {!isAuthenticated && ['/customer-sign-in'].includes(currentPathname) && (
            <Link to={`/sign-in`} className="header__action">
              Sou profissional
            </Link>
          )}
        </div>
      </div>

      {isAuthenticated && (
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
              {userAccountUrl && (
                <>
                  <li>
                    <strong>Agenda</strong>
                    <ul className="m-t-10">
                      <li>
                        <Link
                          to={`/${userAccountUrl}`}
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
                </>
              )}

              {!userAccountUrl && (
                <>
                  <li>
                    <Link
                      to="/customer-schedules"
                      onClick={() => setIsOpen(false)}
                    >
                      Meus compromissos
                    </Link>
                  </li>
                </>
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
