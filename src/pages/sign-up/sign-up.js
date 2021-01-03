import React, { useContext, useState } from 'react';
import AuthService from '../../services/auth';
import schema from './sign-up-schema-validator';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Redirect, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/auth';
import { FormInputError } from '../../components/input-form-error/input-form-error'
import { replaceSpecialCharacters } from '../../utils/utils';

const SignUp = () => {
	const history = useHistory();
    const { isAuthenticated, userAccountUrl } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const { register, handleSubmit, formState, errors, setValue } = useForm({
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

			history.push('/signin');
		} catch ({ response }) {
			setError(response.data);
			setIsLoading(false);
		}
	};

	if (isAuthenticated) {
        return <Redirect to={`/${userAccountUrl}`} />;
    }

    return (
        <div className="container p-b-30">
			<div className="page__header">
				<div className="container">
					{isLoading ? (
						<span className="loading"></span>
					) : (
						<h1 className="page__title">Solicite seu cadastro</h1>
					)}
					<div className="m-t-5">
						<span className="page__description">Retornaremos a liberação de sua conta em instantes.</span>
					</div>
				</div>
			</div>
            <form onSubmit={handleSubmit(signUpForm)} className="m-t-30 m-b-15">
				{error && <div className="text--center m-b-15">{error}</div>}
				<div className="box">
					<div className="m-b-15">
						<strong className="color--white">Informações da conta</strong>
					</div>
					<div className="m-b-15">
						<input
							name="accountUrl"
							type="text"
							ref={register}
							placeholder="Url da conta"
							disabled={isLoading}
							className="input"
							onBlur={(event) => setValue('accountUrl', replaceSpecialCharacters(event.target.value))}
						/>
						<FormInputError
							error={errors.accountUrl && errors.accountUrl.message}
						/>
					</div>
					<div className="m-b-15">
						<input
							name="accountName"
							type="text"
							ref={register}
							placeholder="Nome da conta"
							disabled={isLoading}
							className="input"
						/>
						<FormInputError
							error={errors.accountName && errors.accountName.message}
						/>
					</div>
					<div className="m-b-15">
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
					<div>
						<input
							name="accountTelephone"
							type="tel"
							ref={register}
							placeholder="Telefone"
							className="input input--dark"
						/>
						<FormInputError
							error={errors.accountTelephone && errors.accountTelephone.message}
						/>
					</div>
				</div>
				<div className="box">
					<div className="m-b-15">
						<strong className="color--white">Informações do usuário</strong>
					</div>
					<div className="m-b-15">
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
					<div className="m-b-15">
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
					<div className="m-b-15">
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
					<div className="m-b-15">
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
				</div>
				<div>
					<button
						type="submit"
						disabled={!formState.isValid || isLoading}
						className="button button--block"
					>
						Cadastrar
					</button>
				</div>
            </form>
			<div className="text--center">
				<Link to="/signin" className="color--white">Entrar</Link>
			</div>
        </div>
    );
};

export default SignUp;
