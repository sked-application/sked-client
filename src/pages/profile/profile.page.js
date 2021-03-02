import React, { useState, useEffect, useCallback, Fragment } from 'react';
import schema from './validators/profile-form.validator';
import UserService from '../../services/user.service';
import NumberFormat from 'react-number-format';
import PageHeader from '../../components/page-header-component/page-header.component';
import FormInputError from '../../components/input-form-error-component/input-form-error.component';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { ShowUp } from '../../components/modal-component/modal.component';

const Profile = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [profile, setProfile] = useState();
	const [toggleShow, setToggleShow] = useState(false);

	const {
		errors,
		control,
		formState,
		reset,
		setValue,
		register,
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'onTouched',
	});

	const handleCloseShowUp = () => {
		reset();
		setToggleShow(false);
	};

	const handleOpenShowUp = (data) => {
		if (data) {
			setValue("userName", data.name);
			setValue("userCpf", data.cpf);
			setValue("accountName", data.account.name);
			setValue("accountCpfCnpj", data.account.cpf_cnpj);
			setValue("accountTelephone", data.account.telephone);
			setValue("accountAddress", data.account.address);
		}

		setToggleShow(true);
	};

	const profileForm = async (values) => {
		try {
			const {
				userName,
				userCpf,
				accountName,
				accountCpfCnpj,
				accountTelephone,
				accountAddress
			} = values;

			await UserService.updateProfile({
				user: {
					cpf: userCpf,
					name: userName,
				},
				account: {
					name: accountName,
					cpf_cnpj: accountCpfCnpj,
					telephone: accountTelephone,
					address: accountAddress,
				},
			});

			getProfile();
			handleCloseShowUp();
			alert('Perfil atualizado com sucesso!');
		} catch ({ response }) {
			alert('Algum erro aconteceu, tente novamente mais tarde.');
		}
	};

	const getProfile = useCallback(async () => {
		setIsLoading(true);

		const { data } = await UserService.profile();

		setProfile(data.user);
		setIsLoading(false);
	}, []);

    useEffect(() => {
		getProfile();
    }, [getProfile]);

    return (
        <div className="container">
			<PageHeader
				title="Perfil"
				description="Gerencie os dados de sua conta." />
			{isLoading ? (
				<div className="loading"></div>
			) : (
				<Fragment>
					{profile && (
						<div className="card card--outline">
							<div className="card__header">
								<h2 className="card__title">Meus dados</h2>
								<strong onClick={() => handleOpenShowUp(profile)} className="card__subtitle color--blue cursor--pointer">Gerenciar</strong>
							</div>
							<div className="flexbox flexbox--column m-b-30">
								<div className="m-t-10">
									<strong>Nome: </strong>
									<span>{profile.name}</span>
								</div>
								<div className="m-t-10">
									<strong>E-mail: </strong>
									<span>{profile.email}</span>
								</div>
								<div className="m-t-10">
									<strong>Cpf: </strong>
									<span>{profile.cpf || 'Não informado'}</span>
								</div>
								<div className="m-t-10">
									<strong>Administrador: </strong>
									<span>{profile.is_root ? 'Sim' : 'Não'}</span>
								</div>
							</div>

							<div className="card__header">
								<h2 className="card__title">Dados da conta</h2>
							</div>
							<div className="flexbox flexbox--column m-b-30">
								<div className="m-t-10">
									<strong>Conta: </strong>
									<span>{profile.account.name}</span>
								</div>
								<div className="m-t-10">
									<strong>Url: </strong>
									<span>skedapp.com.br/{profile.account.url}</span>
								</div>
								<div className="m-t-10">
									<strong>Cpf/Cnpj: </strong>
									<span>{profile.account.cpf_cnpj}</span>
								</div>
								<div className="m-t-10">
									<strong>Número: </strong>
									<span>{profile.account.telephone || 'Não informado'}</span>
								</div>
								<div className="m-t-10">
									<strong>Endereço: </strong>
									<span>{profile.account.address || 'Não informado'}</span>
								</div>
							</div>
						</div>
					)}
				</Fragment>
			)}

			<ShowUp
				title="Edição de perfil"
				isOpen={toggleShow}
				handleClose={handleCloseShowUp}>
				<form
					onSubmit={handleSubmit(profileForm)}
					className="flexbox flexbox--column">
					<div className="flexbox__item">
						<div className="m-b-5">
							<label htmlFor="userName">
								Meu nome
							</label>
						</div>
						<input
							id="userName"
							name="userName"
							type="text"
							ref={register}
							className="input input--dark"/>
						<FormInputError error={errors.userName && errors.userName.message} />
					</div>
					<div className="flexbox__item m-t-16">
						<div className="m-b-5">
							<label htmlFor="userCpf">Meu cpf</label>
						</div>
						<input
							id="userCpf"
							name="userCpf"
							type="text"
							ref={register}
							placeholder="Cpf sem pontos e barras"
							className="input input--dark" />
						<FormInputError error={errors.userCpf && errors.userCpf.message} />
					</div>

					{profile && profile.is_root && (
						<Fragment>
							<div className="flexbox__item m-t-16">
								<div className="m-b-5">
									<label htmlFor="accountName">Nome da conta</label>
								</div>
								<input
									id="accountName"
									name="accountName"
									type="text"
									ref={register}
									className="input input--dark" />
								<FormInputError error={errors.accountName && errors.accountName.message} />
							</div>
							<div className="flexbox__item m-t-16">
								<div className="m-b-5">
									<label htmlFor="accountCpfCnpj">Cpf/Cnpj da conta</label>
								</div>
								<input
									id="accountCpfCnpj"
									name="accountCpfCnpj"
									type="text"
									ref={register}
									placeholder="Cpf/Cnpj sem pontos e barras"
									className="input input--dark" />
								<FormInputError error={errors.accountCpfCnpj && errors.accountCpfCnpj.message} />
							</div>
							<div className="flexbox__item m-t-16">
								<div className="m-b-5">
									<label htmlFor="accountTelephone">Telefone</label>
								</div>
								<Controller
									id="accountTelephone"
									name="accountTelephone"
									control={control}
									as={<NumberFormat
										format="(##) #####-####"
										mask="_"
										type="tel"
										className="input input--dark"
										placeholder="Telefone"/>} />
								<FormInputError error={errors.accountTelephone && errors.accountTelephone.message} />
							</div>
							<div className="flexbox__item m-t-16">
								<div className="m-b-5">
									<label htmlFor="accountAddress">Endereço</label>
								</div>
								<input
									id="accountAddress"
									name="accountAddress"
									type="text"
									ref={register}
									className="input input--dark" />
								<FormInputError error={errors.accountAddress && errors.accountAddress.message} />
							</div>
						</Fragment>
					)}

					<div className="flexbox__item m-t-16">
						<button
							type="submit"
							disabled={!formState.isValid}
							className="button button--block button--purple">
							Editar
						</button>
					</div>
				</form>
			</ShowUp>
        </div>
    );
};

export default Profile;
