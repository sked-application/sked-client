import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { classNames } from '../../utils/helper';
// import Button from '../button';

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { AUTH_STATE, AUTH_DISPATCH, AUTH_ACTIONS } = useContext(AuthContext);
  const professionalMenu = {
    Agenda: [
      {
        name: 'Minha página',
        link: `/${AUTH_STATE.userCompany?.url}`,
      },
      { name: 'Agendamentos', link: '/schedules' },
    ],
    Finanças: [
      {
        name: 'Relatórios',
        link: '/statistics',
      },
    ],
    Configurações: [
      {
        name: 'Serviços',
        link: '/services',
      },
      {
        name: 'Profissionais',
        link: '/professionals',
        isUnavailable: AUTH_STATE.userCompany?.plan !== 'CUSTOM',
      },
      {
        name: 'Meus horários',
        link: '/settings',
      },
      {
        name: 'Bloqueio de agenda',
        link: '/schedule-locks',
      },
      {
        name: 'Perfil',
        link: '/profile',
      },
    ],
  };
  const customerMenu = {
    Agenda: [
      {
        name: 'Favoritos',
        link: '/favorites',
      },
      { name: 'Meus compromissos', link: '/customer-schedules' },
      { name: 'Perfil', link: '/customer-profile' },
    ],
  };

  const headerSignOut = () => {
    AUTH_DISPATCH({
      type: AUTH_ACTIONS.SET_SIGN_OUT,
    });

    setIsMenuOpen(false);
  };

  return (
    <Fragment>
      {AUTH_STATE.isAuthenticated && (
        <div>
          <div
            className={classNames(
              'fixed h-screen w-full bg-slate-800 top-0 left-0 transition-all duration-300 md:invisible z-10',
              isMenuOpen ? 'opacity-60 visible' : 'opacity-0 invisible',
            )}
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div
            className={classNames(
              'h-screen w-64 bg-white transition-all duration-300 z-10 overflow-y-auto',
              'fixed right-0 top-0 w-64 p-4',
              'md:sticky md:top-4 md:p-0 md:translate-x-0 md:pl-4',
              isMenuOpen ? 'translate-x-0' : 'translate-x-64',
            )}
          >
            <ul>
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
                              <Link
                                to={link}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                - {name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                  {/* <div className="mb-4">
                    <Link to="/plans" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        type="button"
                        className="button button--block button--primary"
                      >
                        <span>Meu plano</span>
                      </Button>
                    </Link>
                  </div> */}
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
                              <Link
                                to={link}
                                onClick={() => setIsMenuOpen(false)}
                              >
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
            <div className="text-center">
              <a
                type="button"
                className="text-indigo-500 font-semibold cursor-pointer underline"
                onClick={headerSignOut}
              >
                <span>Encerrar sessão</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Sidebar.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default Sidebar;
