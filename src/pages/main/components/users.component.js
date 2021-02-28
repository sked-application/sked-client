import React, { useContext, useEffect, useState } from 'react';
import UserService from '../../../services/user.service';

import {
	AiOutlineUser,
} from "react-icons/ai";
import { MainContext } from '../contexts/main.context';

const MainUsers = () => {
	const {
		setUser,
		user,
		accountInfo,
		setService
	} = useContext(MainContext);
    const [users, setUsers] = useState({});

    const handleChangeUser = (userId) => {
        setUser(users[userId] || {});
        setService({});
    };

    useEffect(() => {
        (async () => {
			if (!accountInfo.id) {
				return;
			}

            const { data } = await UserService.findAllByAccountId({
                account_id: accountInfo.id,
			});

			const userValues = Object.values(data.users);

			if (userValues.length === 1) {
				setUser(userValues[0]);
			}

            setUsers(data.users);
        })();
    }, [accountInfo, setUser]);

    return (
        <div className="card card--professional">
            <div className="card__header">
                <h2 className="card__title">
					<AiOutlineUser /> Profissional
				</h2>
            </div>
            <div className="m-t-5">
                <select
                    value={user.id || ''}
					onChange={(event) => handleChangeUser(event.target.value)}
					className="select select--dark"
                >
                    <option>Selecione</option>
                    {Object.values(users).map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MainUsers;
