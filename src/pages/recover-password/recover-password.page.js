import React, { useContext, useState } from 'react';
import schema from './validators/recover-password.validator';
import AuthService from '../../services/auth.service';
import PageHeader from '../../components/page-header-component/page-header.component';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/auth-context/auth.context';
import { FormInputError } from '../../components/input-form-error-component/input-form-error.component';
import { AiOutlineLock } from 'react-icons/ai';

import {
	Link,
	Redirect,
	useHistory
} from 'react-router-dom';

import './recover-password.page.scss';

const RecoverPassword = () => {
	const history = useHistory();
	const isCustomer = ['/recover-password-customer'].includes(history.location.pathname);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
	const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, userAccountUrl } = useContext(AuthContext);

	const { register, handleSubmit, reset, formState, errors } = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'onTouched',
	});

    const recoverPasswordForm = async (values) => {
		try {
			setIsLoading(true);

			const { email } = values;
			await AuthService.recorverPassword({
				email,
				is_customer: isCustomer
			});

			reset();
			setIsLoading(false);
			setSuccess('Link enviado para seu email.');

			if (error) {
				setError('');
			}
		} catch ({ response }) {
			setError(response.data);
			setIsLoading(false);

			if (success) {
				setSuccess('');
			}
		}
	};

	if (isAuthenticated) {
		const redirectUrl = userAccountUrl ? '/schedules' : '/customer-schedules';

        return <Redirect to={redirectUrl} />;
    }

    return (
        <div className="container">
			<PageHeader
				title="Esqueci a senha"
				description="Um link de recuperação será enviado para seu email." />
			{isLoading && (
				<span className="loading"></span>
			)}
			{error && (
				<div className="recover-password__error">{error}</div>
			)}
			{success && (
				<div className="recover-password__success">{success}</div>
			)}
            <form
				onSubmit={handleSubmit(recoverPasswordForm)}
				className="recover-password__form card card--outline">
				<div className="card__header">
					<h2 className="card__title">
						<AiOutlineLock /> Recuperar
					</h2>
				</div>
				<div className="recover-password__field">
					<input
						name="email"
						type="email"
						ref={register}
						className="input"
						placeholder="Email"
						disabled={isLoading} />
					<FormInputError error={errors.email && errors.email.message} />
				</div>
                <div>
                    <button
                        disabled={!formState.isValid || isLoading}
                        className="button button--block button--purple">
                        Enviar
                    </button>
                </div>
            </form>
			<div className="recover-password__redirect">
				<Link to="/sign-in">Entrar</Link>
			</div>
        </div>
    );
};

export default RecoverPassword;
