import React, { useContext, useState } from 'react';
import schema from './recover-password-schema-validator';
import AuthService from '../../services/auth';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/auth/auth';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { FormInputError } from '../../components/input-form-error/input-form-error';

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
        <div className="container p-b-30">
			<div className="page__header">
				<div className="container">
					{isLoading ? (
						<span className="loading"></span>
					) : (
						<h1 className="page__title">Recuperar a senha</h1>
					)}
					<div className="m-t-5">
						<span className="page__description">O link de recuperação será enviado para seu email.</span>
					</div>
				</div>
			</div>
            <form onSubmit={handleSubmit(recoverPasswordForm)} className="m-t-30 m-b-15">
				{error && <div className="text--center m-b-15">{error}</div>}
				{success && <div className="text--center m-b-15">{success}</div>}
				<div className="box m-b-15">
					<div>
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
				</div>
                <div className="m-b-15">
                    <button
                        disabled={!formState.isValid || isLoading}
                        className="button button--block"
                    >
                        Enviar
                    </button>
                </div>
            </form>
			<div className="text--center">
				<Link to="/signin" className="color--white">Entrar</Link>
			</div>
        </div>
    );
};

export default RecoverPassword;
