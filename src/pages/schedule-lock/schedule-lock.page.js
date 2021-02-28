import React, { useState, useEffect } from 'react';
import moment from 'moment';
import schema from './validators/schedule-lock-form.validator';
import ScheduleLockService from '../../services/schedule-lock.service';
import PageHeader from '../../components/page-header-component/page-header.component';

import { getFormattedDatePreview } from '../../utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { ShowUp, ShowUpButton } from '../../components/show-up.component';
import { FormInputError } from '../../components/input-form-error.component';
import { BsPlus } from 'react-icons/bs';

const ScheduleLock = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [scheduleLocks, setScheduleLocks] = useState([]);
	const [toggleShow, setToggleShow] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const { register, handleSubmit, reset, formState, errors, setValue } = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'onTouched',
	});

	const scheduleLockForm = async values => {
		try {
			const { id, date, start, end } = values;
			let message;

			if (id) {
				await ScheduleLockService.update(id, {
					date,
					start,
					end,
				});

				message = 'Bloqueio atualizado com sucesso!';
			} else {
				await ScheduleLockService.create({
					date,
					start,
					end,
				});

				message = 'Bloqueio cadastrado com sucesso!';
			}

			reset();
			listScheduleLocks();
			handleCloseShowUp();
			alert(message);
		} catch ({ response }) {
			alert(response.data);
		}
	};

	const removeScheduleLock = async id => {
        try {
			if (window.confirm('Deseja remover esse bloqueio de agenda?')) {
				await ScheduleLockService.remove(id);

				listScheduleLocks();
			}
        } catch ({ response }) {
            alert('Algum erro aconteceu, tente novamente mais tarde.');
        }
	};

	const handleCloseShowUp = () => {
		setTimeout(() => {
			reset();
		}, 300);

		setToggleShow(false);
	};

    const handleOpenShowUp = (data) => {
		if (data) {
			setValue("id", data.id);
			setValue("start", data.start);
			setValue("end", data.end);
			setValue("date", moment(data.date).format('YYYY-MM-DD'));
			setIsEdit(true);
		} else {
			setValue("date", moment().format('YYYY-MM-DD'));
		}

		setToggleShow(true);
	};

	const listScheduleLocks = async () => {
		setIsLoading(true);

		const { data } = await ScheduleLockService.findAll();

		setScheduleLocks(data.schedule_locks);
		setIsLoading(false);
	};

    useEffect(() => {
		listScheduleLocks();
    }, []);

    return (
        <div className="container">
			<PageHeader
				title="Bloqueio de agenda"
				description="Aqui você gerencia o bloqueio de agenda para dias específicos." />
			{isLoading ? (
				<div className="loading"></div>
			) : (
				<>
					<div className="flexbox flexbox__justify--end m-b-16">
						<ShowUpButton onClick={() => handleOpenShowUp()}>
							<BsPlus fontSize="30" fontWeight="700"/>
						</ShowUpButton>
					</div>
					{scheduleLocks.map((item, index) => (
						<div key={index} className="card card--outline">
							<div>
								<div className="card__header">
									<h2 className="card__title">{getFormattedDatePreview(item.date)}</h2>
									<strong
										onClick={() => handleOpenShowUp(item)}
										className="card__subtitle color--blue cursor--pointer"
									>
										Editar
									</strong>
								</div>
								<div className="flexbox flexbox--end flexbox__justify--between">
									<div className="badge badge--light badge--outline cursor--pointer text--center">
										<span>{item.start.slice(0, 5)} às {item.end.slice(0, 5)}</span>
									</div>
									<button
										onClick={() => removeScheduleLock(item.id)}
										className="button button--outline button--small">
										Remover
									</button>
								</div>
							</div>
						</div>
					))}

					{!scheduleLocks.length && (
						<div className="text--center">
							<span>Clique no botão acima para configurar um bloqueio de agenda.</span>
						</div>
					)}
				</>
			)}

			<ShowUp
				title="Gerenciar bloqueio de agenda"
				isOpen={toggleShow}
				handleClose={handleCloseShowUp}
			>
				<>
					<form
						onSubmit={handleSubmit(scheduleLockForm)}
						className="flexbox flexbox--column"
					>
						<div className="flexbox flexbox--column">
							<div className="flexbox__item">
								<div className="m-b-5">
									<label htmlFor="date">Data</label>
								</div>
								<input
									id="date"
									name="date"
									type="date"
									ref={register}
									className="input input--dark"
								/>
								<FormInputError
									error={errors.date && errors.date.message}
								/>
							</div>
							<div className="flexbox m-t-16">
								<div className="flexbox__item">
									<div className="m-b-5">
										<label htmlFor="start">Início</label>
									</div>
									<input
										id="start"
										name="start"
										type="time"
										ref={register}
										className="input input--dark"
									/>
									<FormInputError
										error={errors.start && errors.start.message}
									/>
								</div>
								<div className="flexbox__item m-l-16">
									<div className="m-b-5">
										<label htmlFor="end">
											Término
										</label>
									</div>
									<input
										id="end"
										name="end"
										type="time"
										ref={register}
										className="input input--dark"
									/>
									<FormInputError
										error={errors.end && errors.end.message}
									/>
								</div>
							</div>
							<div>
								<input
									name="id"
									type="hidden"
									ref={register}
								/>
							</div>
							<div className="flexbox m-t-16">
								<button
									disabled={!formState.isValid}
									className="button button--block button--purple"
								>
									{isEdit ? 'Atualizar' : 'Salvar'}
								</button>
							</div>
						</div>
					</form>
				</>
			</ShowUp>
        </div>
    );
};

export default ScheduleLock;
