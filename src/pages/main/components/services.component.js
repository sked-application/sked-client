import React, { useContext, useEffect, useState } from 'react';
import ServiveService from '../../../services/service.service';

import {
	AiOutlineForm,
} from "react-icons/ai";
import { MainContext } from '../contexts/main.context';

const MainService = () => {
	const {
		setService,
		service,
		user,
		accountInfo
	} = useContext(MainContext);
    const [services, setServices] = useState({});

    const handleChangeService = (value) => {
        setService(services[value] || {});
    };

    useEffect(() => {
        (async () => {
			if (!accountInfo.id || !user.id) {
				return;
			}

            const { data } = await ServiveService.findAllByAccountId({
				account_id: accountInfo.id,
				user_id: user.id
            });

            setServices(data.services);
        })();
    }, [accountInfo, user]);

    return (
        <div className="card card--service">
            <div className="card__header">
                <h2 className="card__title">
					<AiOutlineForm /> Serviço
				</h2>
            </div>
            <div className="m-t-5">
                <select
                    value={service.id || ''}
					onChange={(event) => handleChangeService(event.target.value)}
					className="select select--dark"
                >
                    <option>Selecione</option>
                    {Object.values(services).map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MainService;
