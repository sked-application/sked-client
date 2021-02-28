import React, { useState, useEffect, useCallback } from 'react';
import ScheduleService from '../../services/schedule.service';
import moment from 'moment';

import CalendarTimeline from '../schedule/components/calendar-timeline.component';

const statusLabels = {
	CONFIRMED: 'confirmar',
	CANCELED: 'cancelar',

};

const Schedules = () => {
    const [isLoading, setIsLoading] = useState(true);
	const [schedules, setSchedules] = useState([]);
	const [status, setStatus] = useState('SCHEDULED');
	const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

	const updateStatus = async (id, updateStatus) => {
		try {
			if (window.confirm(`Deseja ${statusLabels[updateStatus]} esse agendamento?`)) {
				setIsLoading(true);
				setSchedules([]);

				await ScheduleService.updateStatusFromCostumer({
					id,
					status: updateStatus
				});

				const data = await listSchedules({ date, status });

				setSchedules(data);
				setIsLoading(false);
			}
		} catch ({ response }) {
			alert(response.data);
		}
	};

	const listSchedules = useCallback(async ({ date, status }) => {
		const { data } = await ScheduleService.findCustomerSchedules({
			date,
			status,
		});

		return data.schedules;
	}, []);

    useEffect(() => {
		let unmounted = false;

        (async () => {
			setIsLoading(true);

			const data = await listSchedules({ date, status });

            if (!unmounted) {
				setSchedules(data);
				setIsLoading(false);
            }
        })();

        return () => (unmounted = true);
    }, [date, status, listSchedules]);

    return (
        <div className="container">
			<div className="page__header">
				<h1 className="page__title">Meus compromissos</h1>
				<div className="m-t-5">
					<span className="page__description">Acompanhe seu histórico de agendamentos.</span>
				</div>
			</div>
			<CalendarTimeline
				status={status}
				list={schedules}
				isLoading={isLoading}
				date={date}
				updateStatus={updateStatus}
				setDate={setDate}
				setStatus={setStatus}
				isCustomerSchudule={true}
			/>
        </div>
    );
};

export default Schedules;
