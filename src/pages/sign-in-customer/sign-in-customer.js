import React, { useContext, useState } from 'react';
import CustomerService from '../../services/customer';
import schema from './sign-in-customer-schema-validator';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/auth/auth';
import { Redirect, Link } from 'react-router-dom';
import { FormInputError } from '../../components/input-form-error/input-form-error';

const SignIn = () => {
    const { isAuthenticated, handleSignIn } = useContext(AuthContext);
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

			const { data } = await CustomerService.signIn({
				email,
				password,
			});

			handleSignIn(data.token);
		} catch ({ response }) {
			setError(response.data);
			setIsLoading(false);
		}
	};

    if (isAuthenticated) {
        return <Redirect to="/customer-schedules" />;
    }

    return (
        <div className="container p-b-30">
			<div className="page__header">
				<div className="container">
					{isLoading ? (
						<span className="loading"></span>
					) : (
						<h1 className="page__title">Sou cliente</h1>
					)}
					<div className="m-t-5">
						<span className="page__description">Gerencie seus compromissos.</span>
					</div>
				</div>
			</div>
            <form onSubmit={handleSubmit(signInForm)} className="m-t-30 m-b-15">
				{error && <div className="text--center color--white m-b-15">{error}</div>}
				<div className="box m-b-20">
					<div className="m-b-15">
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
					<div>
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
				</div>
				<div className="m-b-20">
					<Link to="/recover-password-customer" className="color--white">
						<span>Esqueceu a senha?</span>
					</Link>
				</div>
				<div>
					<button
						type="submit"
						disabled={!formState.isValid || isLoading}
						className="button button--block"
					>
						Entrar
					</button>
				</div>
            </form>
        </div>
    );
};

export default SignIn;
