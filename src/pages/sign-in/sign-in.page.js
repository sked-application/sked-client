import React, { useContext, useState } from 'react';
import AuthService from '../../services/auth.service';
import schema from './validators/sign-in.validator';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/auth.context';
import { Redirect, Link } from 'react-router-dom';
import { FormInputError } from '../../components/input-form-error.component';

const SignIn = () => {
    const { isAuthenticated, handleSignIn, userAccountUrl } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const { register, handleSubmit, formState, errors } = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'onTouched',
	});

    const signInForm = async (values) => {
		try {
			const { email, password } = values;

			setIsLoading(true);

			const { data } = await AuthService.signIn({
				email,
				password,
			});

			handleSignIn(data.token, data.account);
		} catch ({ response }) {
			setError(response.data);
			setIsLoading(false);
		}
	};

    if (isAuthenticated) {
        return <Redirect to={`/${userAccountUrl ? 'schedules' : 'customer-schedules'}`} />;
    }

    return (
        <div className="container">
			<div className="page__header">
				{isLoading ? (
					<span className="loading"></span>
				) : (
					<h1 className="page__title">Sou profissional</h1>
				)}
				<div className="m-t-5">
					<span className="page__description">Gerencie seus agendamentos.</span>
				</div>
			</div>
            <form onSubmit={handleSubmit(signInForm)} className="m-t-16 m-b-16">
				{error && <div className="text--center m-b-16">{error}</div>}
				<div className="m-b-16">
					<input
						name="email"
						type="email"
						ref={register}
						placeholder="Email"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.email && errors.email.message}
					/>
				</div>
				<div className="m-b-16">
					<input
						name="password"
						type="password"
						ref={register}
						placeholder="Password"
						disabled={isLoading}
						className="input"
					/>
					<FormInputError
						error={errors.password && errors.password.message}
					/>
				</div>
				<div className="m-b-20">
					<Link to="/recover-password" className="color--blue">
						<span>Esqueceu a senha?</span>
					</Link>
				</div>
				<div>
					<button
						type="submit"
						disabled={!formState.isValid || isLoading}
						className="button button--block button--purple"
					>
						Entrar
					</button>
				</div>
            </form>
			<div className="text--center">
				<strong>
					<Link className="color--purple" to="/sign-up">Cadastrar-se</Link>
				</strong>
			</div>
        </div>
    );
};

export default SignIn;
