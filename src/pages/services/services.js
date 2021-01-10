import React, { useState, useEffect } from 'react';
import schema from './services-schemas/service-form-validator';
import ServiceService from '../../services/service';
import NumberFormat from 'react-number-format';

import { ShowUp, ShowUpButton } from '../../components/show-up/show-up';
import { BsPlus } from 'react-icons/bs';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import { FormInputError } from '../../components/input-form-error/input-form-error';

const Services = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [services, setServices] = useState([]);
	const [toggleShow, setToggleShow] = useState(false);

	const { register, handleSubmit, reset, formState, errors, setValue, control } = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'onTouched',
	});

    const serviceForm = async (values) => {
		try {
			const { id,  name, duration, price, showPrice } = values;
			let message;

			if (id) {
				await ServiceService.update(id, {
					name,
					duration,
					price,
					show_price: showPrice
				});

				message = 'Serviço atualizado com sucesso!';
			} else {
				await ServiceService.create({
					name,
					duration,
					price,
					show_price: showPrice,
				});

				message = 'Serviço cadastrado com sucesso!';
			}

			reset();
			listServices();
			handleCloseShowUp();
			alert(message);
		} catch ({ response }) {
			alert('Algum erro aconteceu, tente novamente mais tarde.');
		}
	};

    const removeService = async (id) => {
        try {
			if (window.confirm('Deseja remover esse serviço?')) {
				await ServiceService.remove(id);

				listServices();
			}
        } catch ({ response }) {
            alert('Algum erro aconteceu, tente novamente mais tarde.');
        }
	};

	const handleCloseShowUp = () => {
		reset();
		setToggleShow(false);

		if (isEdit) setIsEdit(false);
	};

	const handleOpenShowUp = (data) => {
		if (data) {
			setValue("id", data.id);
			setValue("name", data.name);
			setValue("duration", data.duration);
			setValue("price", data.price);
			setValue("showPrice", data.show_price);
			setIsEdit(true);
		}

		setToggleShow(true);
	};

	const listServices = async () => {
		setIsLoading(true);

		const { data } = await ServiceService.findAll();

		setServices(data.services);
		setIsLoading(false);
	};

    useEffect(() => {
        listServices();
    }, []);

    return (
        <div className="p-b-20">
			<div className="page__header p-b-30">
				<div className="container">
					<h1 className="page__title">Serviços</h1>
					<div className="m-t-5">
						<span className="page__description">Adicione e gerencie seus serviços.</span>
					</div>
				</div>
			</div>
            <div className="container m-t-15 m-b-30">
                <>
                    {isLoading ? (
                        <div className="loading"></div>
                    ) : (
                        <>
							<div className="flexbox flexbox__justify--end m-b-20">
								<ShowUpButton onClick={() => handleOpenShowUp()}>
									<BsPlus fontSize="30" fontWeight="700"/>
								</ShowUpButton>
							</div>
                            {services.map((item) => (
								<div key={item.id} className="card">
									<div className="card__header">
										<h2 className="card__title">
											{item.name}
										</h2>
										<strong
											onClick={() => handleOpenShowUp(item)}
											className="card__subtitle color--primary cursor--pointer"
										>
											Editar
										</strong>
									</div>
									<div className="m-t-10">
										<strong>Duração: </strong>
										<span>{item.duration} minutos</span>
									</div>
									<div className="m-t-10">
										<strong>Preço: </strong>
										<span>R$: {item.price}</span>
									</div>
									<div className="m-t-10 flexbox">
										<button
											onClick={() => removeService(item.id)}
											className="button button--danger">
											Remover
										</button>
									</div>
								</div>
                            ))}

							{!services.length && (
								<div className="text--center">
									<span className="color--white">Clique no botão abaixo e adicione seus serviços.</span>
								</div>
							)}
                        </>
                    )}

					<ShowUp
						title={`${isEdit ? 'Atualizar serviço' : 'Adicione um serviço'}`}
						isOpen={toggleShow}
						handleClose={handleCloseShowUp}
					>
						<form
							onSubmit={handleSubmit(serviceForm)}
							className="flexbox flexbox--column"
						>
							<div className="flexbox__item">
								<div className="m-b-5">
									<label htmlFor="name">
										Nome
									</label>
								</div>
								<input
									id="name"
									name="name"
									type="text"
									ref={register}
									className="input input--dark"
								/>
								<FormInputError
									error={errors.name && errors.name.message}
								/>
							</div>
							<div className="flexbox__item m-t-15">
								<div className="m-b-5">
									<label htmlFor="duration">
										Duração em minutos
									</label>
								</div>
								<input
									id="duration"
									name="duration"
									type="number"
									ref={register}
									className="input input--dark"
								/>
								<FormInputError
									error={errors.duration && errors.duration.message}
								/>
							</div>
							<div className="flexbox__item m-t-15">
								<div className="m-b-5">
									<label htmlFor="price">
										Valor
									</label>
								</div>
								<Controller
									id="price"
									name="price"
									control={control}
									as={<NumberFormat
										decimalSeparator={'.'}
										decimalScale={2}
										allowNegative={false}
										className="input input--dark"
									/>}
								/>
								<FormInputError
									error={errors.price && errors.price.message}
								/>
							</div>
							<div className="flexbox__item m-t-15">
								<div className="m-b-5">
									<label className="flexbox cursor--pointer">
										<input
											name="showPrice"
											type="checkbox"
											ref={register}
											className="checkbox"
										/>
										<span className="m-l-10">Mostrar preço</span>
									</label>
								</div>
							</div>
							<input
								name="id"
								type="hidden"
								ref={register}
							/>
							<div className="flexbox__item m-t-15">
								<button
									type="submit"
									disabled={!formState.isValid}
									className="button button--block button--primary">
									Adicionar
								</button>
							</div>
						</form>
					</ShowUp>
                </>
            </div>
        </div>
    );
};

export default Services;
