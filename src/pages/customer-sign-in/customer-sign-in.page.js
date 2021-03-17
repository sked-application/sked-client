import React, { useContext, useState } from 'react';
import AuthService from '../../services/auth.service';
import schema from './validators/customer-sign-in.validator';
import PageHeader from '../../components/page-header-component/page-header.component';
import FormInputError from '../../components/input-form-error-component/input-form-error.component';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/auth-context/auth.context';
import { Redirect, Link } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai';
import { handleError } from '../../utils/api';

import './customer-sign-in.page.scss';

const SignIn = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, handleSignIn, userAccountUrl } = useContext(AuthContext);

	const { register, handleSubmit, formState, errors } = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'onTouched',
	});

    const signInForm = async values => {
		try {
			setIsLoading(true);

			const { email, password } = values;
			const { data } = await AuthService.customerSignIn({
				email,
				password,
			});

			handleSignIn(data.token);
		} catch (error) {
			setError(handleError(error));
			setIsLoading(false);
		}
	};

	if (isAuthenticated) {
		const redirectUrl = userAccountUrl ? '/schedules' : '/customer-schedules';

        return <Redirect to={redirectUrl} />;
    }

    return (
        <div className="container">
			<PageHeader
				title="Sou cliente"
				description="Gerencie seus compromissos." />
			{isLoading && (
				<span className="loading"></span>
			)}
			{error && (
				<div className="customer-sign-in__error">{error}</div>
			)}
            <form
				onSubmit={handleSubmit(signInForm)}
				className="customer-sign-in__form card card--outline">
				<div className="card__header">
					<h2 className="card__title">
						<AiOutlineLogin /> Entrar
					</h2>
				</div>
				<div className="customer-sign-in__field">
					<input
						name="email"
						type="email"
						ref={register}
						placeholder="Email"
						disabled={isLoading}
						className="input" />
					<FormInputError error={errors.email && errors.email.message} />
				</div>
				<div className="customer-sign-in__field">
					<input
						name="password"
						type="password"
						ref={register}
						placeholder="Password"
						disabled={isLoading}
						className="input" />
					<FormInputError error={errors.password && errors.password.message} />
				</div>
				<div className="customer-sign-in__forgot-password">
					<Link to="/recover-password-customer">Esqueceu a senha?</Link>
				</div>
				<div className="customer-sign-in__field">
					<button
						type="submit"
						disabled={!formState.isValid || isLoading}
						className="button button--block button--purple">
						Entrar
					</button>
				</div>
            </form>
        </div>
    );
};

export default SignIn;
