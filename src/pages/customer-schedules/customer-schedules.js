import React, { useState, useEffect, useCallback } from 'react';
import ScheduleService from '../../services/schedule';
import moment from 'moment';

import { getDayLabelByDate } from '../../utils/utils';
import { Link } from 'react-router-dom';

const Schedules = () => {
    const [isLoading, setIsLoading] = useState(true);
	const [schedules, setSchedules] = useState([]);
	const [status, setStatus] = useState('SCHEDULED');
	const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));

	const updateStatus = async (id, updateStatus) => {
		await ScheduleService.updateStatusFromCostumer({
			id,
			status: updateStatus
		});

		const data = await listSchedules({ startDate, status });
		setSchedules(data);
	};

	const listSchedules = useCallback(async ({ startDate, status }) => {
		const { data } = await ScheduleService.findCustomerSchedules({
			date: startDate,
			status,
		});

		return data.schedules;
	}, []);

    useEffect(() => {
		let unmounted = false;

        (async () => {
			setIsLoading(true);

			const data = await listSchedules({ startDate, status });

            if (!unmounted) {
				setSchedules(data);
				setIsLoading(false);
            }
        })();

        return () => (unmounted = true);
    }, [startDate, status, listSchedules]);

    return (
        <div className="p-b-80">
			<div className="page__header">
				<div className="container">
					<h1 className="page__title">Meus compromissos</h1>
					<div className="m-t-5">
						<span className="page__description">Acompanhe seu histórico de agendamentos.</span>
					</div>
				</div>
			</div>
            <div className="container m-t-15 m-b-30">
				<div className="box">
					<div className="flexbox__item flexbox">
						<div className="flexbox__item">
							<input
								type="date"
								value={startDate}
								onChange={(event) => setStartDate(event.target.value)}
								className="input input--dark"
							/>
						</div>
						<div className="flexbox__item m-l-15">
							<select
								value={status}
								onChange={(event) => setStatus(event.target.value)}
								className="select select--dark"
							>
								<option value="SCHEDULED">Agendados</option>
								<option value="CANCELED">Cancelados</option>
								<option value="FINISHED">Finalizados</option>
							</select>
						</div>
					</div>
				</div>
                {isLoading ? (
					<div className="loading"></div>
                ) : (
                    <>
						{schedules.map((schedule) => (
							<div key={schedule.id} className="card">
								<div className="card__header">
									<Link to={`/${schedule.account.name}`}>
										<h2 className="card__title">
											{schedule.account.user.name}
										</h2>
										{status === 'SCHEDULED' && schedule.confirmed_at && <span className="card__subtitle color--secondary">Confirmado</span>}
										{status === 'CANCELED' && <span className="card__subtitle color--danger">Cancelado</span>}
										{status === 'FINISHED' && <span className="card__subtitle color--success">Finalizado</span>}
									</Link>
									<div className="flexbox flexbox--column flexbox--end">
										<span className="card__subtitle m-b-5">{moment(schedule.date).format('DD/MM/YYYY')}</span>
										<span className="card__subtitle">{getDayLabelByDate(schedule.date)}</span>
									</div>
								</div>
								<div className="m-t-10">
									<strong>Serviço: </strong>
									<span>{schedule.service.name}</span>
								</div>
								<div className="m-t-10">
									<strong>Horário: </strong>
									<span>{`${schedule.start.slice(0, 5)} - ${schedule.end.slice(0,5)}`}</span>
								</div>
								<div className="m-t-10">
									<strong>Valor: </strong>
									<span className="color--success">R$ {schedule.price}</span>
								</div>

								{status === 'SCHEDULED' && (
									<div>
										<div className="m-t-10 flexbox flexbox--center">
											{!schedule.confirmed_at && (
												<button onClick={() => updateStatus(schedule.id, 'CONFIRMED')} className="button button--secondary m-r-10">
													Confirmar
												</button>
											)}

											<button onClick={() => updateStatus(schedule.id, 'CANCELED')} className="button button--danger m-r-10">
												Cancelar
											</button>
											<Link className="color--success m-l-5" to={`/${schedule.account.name}`}>
												<strong>Ver agenda</strong>
											</Link>
										</div>
									</div>
								)}
							</div>
						))}

						{!schedules.length && (
							<div className="text--center color--white">
								<span>Nenhum agendamento para este dia.</span>
							</div>
						)}
                    </>
                )}
            </div>
        </div>
    );
};

export default Schedules;
