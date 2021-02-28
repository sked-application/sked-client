import React, { useState, useContext, useEffect } from 'react';
import TimegridService from '../../../services/timegrid.service';

import {
	AiOutlineClockCircle,
} from "react-icons/ai";
import { MainContext } from '../contexts/main.context';
import { getDayLabelByDate } from '../../../utils/utils';

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
        <div className="card card--slots">
            <div className="card__header">
				<div>
					<h2 className="card__title">
						<AiOutlineClockCircle /> Horários
					</h2>
				</div>
				<div className="flexbox flexbox--column flexbox--end">
					<span className="card__subtitle m-b-5">{getDayLabelByDate(startDate)}</span>

					{service && service.show_price && (
						<span className="card__subtitle color--green">R$ {service.price}</span>
					)}
				</div>
            </div>

			{service.id && user.id && !!timegrid.length && (
				<div>
					<span className="card__subtitle color--purple">{service.name}</span>
				</div>
			)}

            {isLoading ? (
                <div className="loading loading--purple m-b-16"></div>
            ) : (
                <>
					{!!timegrid.length && (
						<div className="slot__box">
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
					)}

                    {service.id && user.id && !timegrid.length && (
						<div className="slot__pending">
							<span>Nenhum horário disponível</span>
						</div>
                    )}

                    {!user.id ? (
						<div className="slot__pending">
							<span>Selecione um profissional.</span>
						</div>
					) : !service.id ? (
						<div className="slot__pending">
							<span>Selecione um serviço.</span>
						</div>
					) : ''}
                </>
            )}
        </div>
    );
};

export default MainSlotGrid;
