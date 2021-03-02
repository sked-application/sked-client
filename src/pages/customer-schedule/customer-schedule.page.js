import React, { useState, useEffect, useCallback } from 'react';
import ScheduleService from '../../services/schedule.service';
import CalendarTimeline from '../../components/calendar-timeline-component/calendar-timeline.component';
import PageHeader from '../../components/page-header-component/page-header.component';
import moment from 'moment';

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

				await ScheduleService.updateStatusFromCostumer({
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
		try {
			setIsLoading(true);

			const { data } = await ScheduleService.findCustomerSchedules({
				date,
				status,
			});

			setSchedules(data.schedules);
			setIsLoading(false);
		} catch (error) {
			alert('Algum erro aconteceu, tente novamente mais tarde.');
			setIsLoading(false);
		}
	}, [date, status]);

    useEffect(() => {
		listSchedules();
    }, [listSchedules]);

    return (
        <div className="container">
			<PageHeader
				title="Meus compromissos"
				description="Acompanhe seu histórico de agendamentos." />
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
