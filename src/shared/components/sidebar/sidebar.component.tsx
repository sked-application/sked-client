import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth';
import { classNames } from '../../utils/helper';
import { TMenuObject } from './sidebar.types';

const Sidebar: React.FC<{
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { AUTH_PROVIDER } = React.useContext(AuthContext);
  const professionalMenu: TMenuObject = {
    Agenda: [
      {
        name: 'Minha página',
        link: `/${AUTH_PROVIDER.state.userCompany?.url}`,
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
        isUnavailable: AUTH_PROVIDER.state.userCompany?.plan !== 'CUSTOM',
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
  const customerMenu: TMenuObject = {
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
    AUTH_PROVIDER.dispatch({
      type: AUTH_PROVIDER.actions.SET_SIGN_OUT,
    });

    setIsMenuOpen(false);
  };

  return (
    <React.Fragment>
      {AUTH_PROVIDER.state.isAuthenticated && (
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
              {AUTH_PROVIDER.state.isProfessional && (
                <React.Fragment>
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
                </React.Fragment>
              )}
              {AUTH_PROVIDER.state.isCustomer && (
                <React.Fragment>
                  {Object.entries(customerMenu).map(([category, menu]) => (
                    <li
                      key={category}
                      className="mb-4 border divide-solid border-stone-200 rounded-xl p-4"
                    >
                      <span className="text-md font-semibold">{category}</span>
                      <ul>
                        {menu
                          .filter((menuItem) => !menuItem.isUnavailable)
                          .map((menuItem) => (
                            <li key={menuItem.name} className="mt-1">
                              <Link
                                to={menuItem.link}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                - {menuItem.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </React.Fragment>
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
    </React.Fragment>
  );
};

export default Sidebar;
