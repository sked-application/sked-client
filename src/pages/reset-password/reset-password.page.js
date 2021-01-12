import React, { useContext, useState } from 'react';
import schema from './validators/reset-password.validator';
import AuthService from '../../services/auth.service';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/auth.context';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import { FormInputError } from '../../components/input-form-error.component';

const ResetPassword = () => {
	const history = useHistory();
	const { token } = useParams();
    const { isAuthenticated, userAccountUrl } = useContext(AuthContext);
    const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { register, handleSubmit, reset, formState, errors } = useForm({
		resolver: yupResolver(schema.form.validator),
		defaultValues: schema.form.initialValues,
		mode: 'onTouched',
	});

    const resetPasswordForm = async (values) => {
		try {
			const { password } = values;

			setIsLoading(true);

			const { data } = await AuthService.resetPassword({
				password,
				token
			});

			reset();
			setIsLoading(false);

			data.is_customer ? history.push('/customer-sign-in') : history.push('/sign-in');
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
						<h1 className="page__title">Resetar a senha</h1>
					)}
				</div>
			</div>
            <form onSubmit={handleSubmit(resetPasswordForm)} className="m-t-30 m-b-15">
				{error && <div className="text--center color--white m-b-15">{error}</div>}
				<div className="box m-b-15">
					<div className="m-b-15">
						<input
							name="password"
							type="password"
							ref={register}
							placeholder="Nova senha"
							disabled={isLoading}
							className="input"
						/>
						<FormInputError
							error={errors.password && errors.password.message}
						/>
					</div>
					<div>
						<input
							name="confirmPassword"
							type="password"
							ref={register}
							placeholder="Confirme sua senha"
							disabled={isLoading}
							className="input"
						/>
						<FormInputError
							error={errors.confirmPassword && errors.confirmPassword.message}
						/>
					</div>
				</div>
                <div className="m-b-15">
                    <button
                        disabled={!formState.isValid || isLoading}
                        className="button button--block"
                    >
                        Resetar
                    </button>
                </div>
            </form>
			<div className="text--center">
				<Link to="/sign-in" className="color--white">Entrar</Link>
			</div>
        </div>
    );
};

export default ResetPassword;
