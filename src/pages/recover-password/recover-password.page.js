import React, { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AiOutlineLock } from 'react-icons/ai';
import schema from './validators/recover-password.validator';
import AuthService from '../../services/auth.service';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';
import { AuthContext } from '../../common/contexts/auth';
import { handleError } from '../../common/utils/api';

import { Link, Redirect } from 'react-router-dom';

import './recover-password.page.scss';

const RecoverPassword = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, userAccountUrl } = useContext(AuthContext);

  const { register, handleSubmit, reset, formState, errors } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const recoverPasswordForm = async (values) => {
    try {
      setIsLoading(true);

      const { email } = values;
      const { message } = await AuthService.sendRecoverEmail({
        email,
      });

      reset();
      setIsLoading(false);
      setSuccess(message);

      if (error) {
        setError('');
      }
    } catch (error) {
      setError(handleError(error));
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
        description="Um link de recuperação será enviado para seu email."
      />
      {isLoading && <span className="loading"></span>}
      {error && <div className="recover-password__error">{error}</div>}
      {success && <div className="recover-password__success">{success}</div>}
      <form
        onSubmit={handleSubmit(recoverPasswordForm)}
        className="recover-password__form card card--outline"
      >
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
            disabled={isLoading}
          />
          <InputFormError touched={touched.email} error={errors.email} />
        </div>
        <div>
          <button
            disabled={!isValid || !isDirty || isLoading}
            className="button button--block button--purple"
          >
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
