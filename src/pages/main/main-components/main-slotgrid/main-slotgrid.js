import React, { useState, useContext, useEffect } from 'react';
import TimegridService from '../../../../services/timegrid';

import { MainContext } from '../../../../contexts/main/main';
import { getDayLabelByDate } from '../../../../utils/utils';

const MainSlotGrid = () => {
	const {
		startDate,
		accountInfo,
		service,
		user,
		setScheduleSlot
	} = useContext(MainContext);
    const [isLoading, setIsLoading] = useState();
    const [timegrid, setTimegrid] = useState([]);
    const [activedSlot, setActivedSlot] = useState();

    const handleSetSlot = (slot, index) => {
        setActivedSlot(index);
        setScheduleSlot({ date: startDate, ...slot });
    };

    useEffect(() => {
        let unmounted = false;

        setIsLoading(true);

        (async () => {
            if (!service.id || !user.id) {
                if (unmounted) return;

                setTimegrid([]);
                setIsLoading(false);
                return;
            }

            const { data } = await TimegridService.findByDay({
                account_id: accountInfo.id,
                date: startDate,
                service_id: service.id,
                user_id: user.id,
                service_duration: service.duration,
            });

            if (unmounted) return;

            if (data.available_timegrid) {
                setTimegrid(data.available_timegrid);
            }

            setActivedSlot();
            setIsLoading(false);
        })();

        return () => (unmounted = true);
    }, [accountInfo, startDate, service, user]);

    return (
        <div className="card">
            <div className="card__header">
				<div>
					<h2 className="card__title">Horários</h2>
				</div>
				<div className="flexbox flexbox--column flexbox--end">
					<span className="card__subtitle m-b-5">{getDayLabelByDate(startDate)}</span>

					{service && service.show_price && (
						<span className="card__subtitle color--success">R$ {service.price}</span>
					)}
				</div>
            </div>

			{service && service.name && (
				<div>
					<span className="card__subtitle color--primary">{service.name}</span>
				</div>
			)}

            {isLoading ? (
                <div className="loading m-b-15"></div>
            ) : (
                <>
                    <div className="slot__box p-t-10">
                        {timegrid.map((slot, index) => (
                            <div
                                key={index}
                                className="slot__item"
                            >
                                <div
									onClick={() => handleSetSlot(slot, index)}
									className={`badge badge--light badge--outline m-t-5 m-b-5 ${activedSlot === index ? 'actived' : ''}`}
                                >
                                    <div className="badge__content">
                                        <span>{slot.start.slice(0, 5)}</span>
                                        <span>{slot.end.slice(0, 5)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {service.id && user.id && !timegrid.length && (
						<div className="text--center">
							<span>Nenhum horário disponível</span>
						</div>
                    )}

                    {!service.id ? (
						<div className="text--center">
							<span>Selecione um serviço.</span>
						</div>
					) : !user.id ? (
						<div className="text--center">
							<span>Selecione um profissional.</span>
						</div>
					) : ''}
                </>
            )}
        </div>
    );
};

export default MainSlotGrid;
