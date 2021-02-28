import React, { useContext, useState } from 'react';
import schema from './validators/recover-password.validator';
import AuthService from '../../services/auth.service';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/auth.context';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { FormInputError } from '../../components/input-form-error.component';

const RecoverPassword = () => {
	const history = useHistory();
    const { isAuthenticated, userAccountUrl } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isCustomer] = useState(['/recover-password-customer'].includes(history.location.pathname));

	const { register, handleSubmit, reset, formState, errors } = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'onTouched',
	});

    const recoverPasswordForm = async (values) => {
		try {
			const { email } = values;

			setIsLoading(true);

			await AuthService.recorverPassword({
				email,
				is_customer: isCustomer
			});

			reset();
			setIsLoading(false);
			setSuccess('Link de recuperação enviado para seu email.');
		} catch ({ response }) {
			setError(response.data);
			setIsLoading(false);
		}
	};

	if (isAuthenticated) {
        return <Redirect to={`/${userAccountUrl || 'customer-schedules'}`} />;
    }

    return (
        <div className="container">
			<div className="page__header">
				{isLoading ? (
					<span className="loading"></span>
				) : (
					<h1 className="page__title">Recuperar a senha</h1>
				)}
				<div className="m-t-5">
					<span className="page__description">O link de recuperação será enviado para seu email.</span>
				</div>
			</div>
            <form onSubmit={handleSubmit(recoverPasswordForm)} className="m-t-16 m-b-16">
				{error && <div className="text--center m-b-16">{error}</div>}
				{success && <div className="text--center m-b-16">{success}</div>}
				<div className="m-b-16">
					<input
						name="email"
						type="email"
						ref={register}
						className="input"
						placeholder="Email"
						disabled={isLoading}
					/>
					<FormInputError
						error={errors.email && errors.email.message}
					/>
				</div>
                <div className="m-b-16">
                    <button
                        disabled={!formState.isValid || isLoading}
                        className="button button--block button--outline"
                    >
                        Enviar
                    </button>
                </div>
            </form>
			<div className="text--center">
				<strong>
					<Link to="/sign-in" className="color--blue">Entrar</Link>
				</strong>
			</div>
        </div>
    );
};

export default RecoverPassword;
