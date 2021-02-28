import React, { useContext, useState } from 'react';
import AuthService from '../../services/auth.service';
import schema from './validators/sign-up.validator';
import NumberFormat from 'react-number-format';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import { Redirect, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';
import { FormInputError } from '../../components/input-form-error.component'
import { replaceSpecialCharacters } from '../../utils/utils';

const SignUp = () => {
	const history = useHistory();
    const { isAuthenticated, userAccountUrl } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const {
		errors,
		control,
		formState,
		setValue,
		register,
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'onTouched',
	});

    const signUpForm = async (values) => {
		try {
			const {
				accountName,
				accountUrl,
				accountCpfCnpj,
				accountTelephone,
				userName,
				userEmail,
				userPassword
			} = values;

			setIsLoading(true);

			await AuthService.signUp({
				account: {
					name: accountName,
					url: accountUrl,
					cpf_cnpj: accountCpfCnpj,
					telephone: accountTelephone,
				},
				user: {
					name: userName,
					email: userEmail,
					password: userPassword,
				}
			});

			history.push('/sign-in');
		} catch ({ response }) {
			setError(response.data);
			setIsLoading(false);
		}
	};

	if (isAuthenticated) {
        return <Redirect to={`/${userAccountUrl}`} />;
    }

    return (
        <div className="container">
			<div className="page__header">
				{isLoading ? (
					<span className="loading"></span>
				) : (
					<h1 className="page__title">Solicite seu cadastro</h1>
				)}
				<div className="m-t-5">
					<span className="page__description">Retornaremos a liberação de sua conta em instantes.</span>
				</div>
			</div>
            <form onSubmit={handleSubmit(signUpForm)} className="m-t-16 m-b-16">
				{error && <div className="text--center m-b-16">{error}</div>}
				<div className="m-b-16">
					<strong>Informações da conta</strong>
				</div>
				<div className="m-b-16">
					<div className="grouped-button">
						<label htmlFor="account-url" className="grouped-button__label">skedapp.com.br/</label>
						<input
							name="accountUrl"
							type="text"
							ref={register}
							placeholder="conta"
							disabled={isLoading}
							id="account-url"
							className="grouped-button__input"
							onBlur={(event) => setValue('accountUrl', replaceSpecialCharacters(event.target.value))}
						/>
					</div>
					<FormInputError
						error={errors.accountUrl && errors.accountUrl.message}
					/>
				</div>
				<div className="m-b-16">
					<input
						name="accountName"
						type="text"
						ref={register}
						placeholder="Nome de seu estabelecimento"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.accountName && errors.accountName.message}
					/>
				</div>
				<div className="m-b-16">
					<input
						name="accountCpfCnpj"
						type="text"
						ref={register}
						placeholder="Cpf/Cnpj da conta sem pontos e barra"
						className="input input--dark"
					/>
					<FormInputError
						error={errors.accountCpfCnpj && errors.accountCpfCnpj.message}
					/>
				</div>
				<div className="m-b-16">
					<Controller
						id="accountTelephone"
						name="accountTelephone"
						control={control}
						as={<NumberFormat
							format="(##) #####-####"
							mask="_"
							type="tel"
							className="input input--dark"
							placeholder="Telefone"
						/>}
					/>
					<FormInputError
						error={errors.accountTelephone && errors.accountTelephone.message}
					/>
				</div>
				<div className="m-b-16">
					<strong>Informações do usuário</strong>
				</div>
				<div className="m-b-16">
					<input
						name="userName"
						type="text"
						ref={register}
						placeholder="Nome"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.userName && errors.userName.message}
					/>
				</div>
				<div className="m-b-16">
					<input
						name="userEmail"
						type="email"
						ref={register}
						placeholder="Email"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.userEmail && errors.userEmail.message}
					/>
				</div>
				<div className="m-b-16">
					<input
						name="userPassword"
						type="password"
						ref={register}
						placeholder="Senha"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.userPassword && errors.userPassword.message}
					/>
				</div>
				<div className="m-b-16">
					<input
						name="userConfirmPassword"
						type="password"
						ref={register}
						placeholder="Confirme sua senha"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.userConfirmPassword && errors.userConfirmPassword.message}
					/>
				</div>
				<div>
					<button
						type="submit"
						disabled={!formState.isValid || isLoading}
						className="button button--block button--purple"
					>
						Cadastrar
					</button>
				</div>
            </form>
			<div className="text--center">
				<strong>
					<Link className="color--purple" to="/sign-in">Entrar</Link>
				</strong>
			</div>
        </div>
    );
};

export default SignUp;
