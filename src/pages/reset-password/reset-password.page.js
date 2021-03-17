import React, { useContext, useState } from 'react';
import schema from './validators/reset-password.validator';
import AuthService from '../../services/auth.service';
import PageHeader from '../../components/page-header-component/page-header.component';
import FormInputError from '../../components/input-form-error-component/input-form-error.component';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../contexts/auth-context/auth.context';
import { AiOutlineLock } from 'react-icons/ai';
import { handleError } from '../../utils/api';
import {
	Link,
	Redirect,
	useParams,
	useHistory
} from 'react-router-dom';

import './reset-password.page.scss';

const ResetPassword = () => {
	const history = useHistory();
	const { token } = useParams();
    const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, userAccountUrl } = useContext(AuthContext);

	const { register, handleSubmit, reset, formState, errors } = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'all',
	});

    const resetPasswordForm = async values => {
		try {
			setIsLoading(true);

			const { password } = values;
			const { data } = await AuthService.resetPassword({
				password,
				token
			});

			reset();
			setIsLoading(false);

			if (data.is_customer) {
				history.push('/customer-sign-in');
				return;
			}

			history.push('/sign-in');
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
			<PageHeader title="Informe a nova senha" />
			{isLoading && (
				<span className="loading"></span>
			)}
			{error && (
				<div className="reset-password__error">{error}</div>
			)}
            <form
				onSubmit={handleSubmit(resetPasswordForm)}
				className="reset-password__form card card--outline">
				<div className="card__header">
					<h2 className="card__title">
						<AiOutlineLock /> Resetar
					</h2>
				</div>
				<div className="reset-password__field">
					<input
						name="password"
						type="password"
						ref={register}
						placeholder="Nova senha"
						disabled={isLoading}
						className="input" />
					<FormInputError error={errors.password && errors.password.message} />
				</div>
				<div className="reset-password__field">
					<input
						name="confirmPassword"
						type="password"
						ref={register}
						placeholder="Confirme sua senha"
						disabled={isLoading}
						className="input" />
					<FormInputError error={errors.confirmPassword && errors.confirmPassword.message} />
				</div>
                <div>
                    <button
                        disabled={!formState.isValid || isLoading}
                        className="button button--block button--purple">
                        Resetar
                    </button>
                </div>
            </form>
			<div className="reset-password__redirect">
				<Link to="/sign-in">Entrar</Link>
			</div>
        </div>
    );
};

export default ResetPassword;
