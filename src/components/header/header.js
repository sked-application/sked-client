import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/auth';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = ({ currentPathname }) => {
    const { isAuthenticated, handleSignOut, userAccountName } = useContext(
        AuthContext
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
                        <span className="header__logo">Sked</span>
                    </div>

                    {isAuthenticated && (
                        <AiOutlineMenu
                            className="header__toggle"
                            onClick={() => setIsOpen(true)}
                        />
                    )}

                    {!isAuthenticated && !['/signin', '/signin-customer', '/signup', '/recover-password'].includes(currentPathname) && (
						<Link to={`/signin`} className="header__action">Sou profissional</Link>
					)}

					{!isAuthenticated && ['/signin'].includes(currentPathname) && (
						<Link to={`/signin-customer`} className="header__action">Sou cliente</Link>
					)}

					{!isAuthenticated && ['/signin-customer'].includes(currentPathname) && (
						<Link to={`/signin`} className="header__action">Sou profissional</Link>
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
                        className={`header__menu ${
                            isOpen ? 'header__menu--active' : ''
                        }`}
                    >
                        <ul className="header__list">
                            {userAccountName && (
                                <>
                                    <li>
                                        <Link
                                            to={`/${userAccountName}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Inicio
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/schedules"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Agendamentos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/services"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Serviços
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/settings"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Grade de horários
                                        </Link>
                                    </li>
                                </>
                            )}

							{!userAccountName && (
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
                                    className="button button--primary"
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
