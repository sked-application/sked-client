import React, { useState, useEffect, useCallback } from 'react';
import ScheduleService from '../../services/schedule.service';
import PageHeader from '../../components/page-header-component/page-header.component';
import CalendarTimeline from '../../components/calendar-timeline-component/calendar-timeline.component';
import moment from 'moment';

const statusLabels = {
	CONFIRMED: 'confirmar',
	CANCELED: 'cancelar',
	FINISHED: 'finalizar',
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

				await ScheduleService.updateStatus({
					id,
					status: updateStatus
				});

				listSchedules();
			}
		} catch ({ response }) {
			alert(response.data);
		}
	};

	const listSchedules = useCallback(async () => {
		setIsLoading(true);

		const { data } = await ScheduleService.findAll({
			date,
			status,
		});

		setSchedules(data.schedules);
		setIsLoading(false);
	}, [date, status]);

    useEffect(() => {
		listSchedules();
	}, [listSchedules]);

    return (
		<div className="container">
			<PageHeader
				title="Agendamentos"
				description="Gerencie sua lista de agendamentos." />
			<CalendarTimeline
				status={status}
				list={schedules}
				isLoading={isLoading}
				date={date}
				updateStatus={updateStatus}
				setDate={setDate}
				setStatus={setStatus}
			/>
		</div>
    );
};

export default Schedules;
