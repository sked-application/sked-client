import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLock } from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useParams, useHistory } from 'react-router-dom';
import schema from './validators/professional-invitation.validator';
import UserService from '../../services/user.service';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';
import { handleError } from '../../common/utils/api';
import './professional-invitation.page.scss';

const ProfessionalInvitation = () => {
  const history = useHistory();
  const { token } = useParams();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState, errors } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const confirmInvatationForm = async (values) => {
    try {
      setIsLoading(true);

      const { password, confirmPassword } = values;
      await UserService.confirmInvitation({
        password,
        confirmPassword,
        token,
      });

      reset();
      setIsLoading(false);

      history.push('/sign-in');
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <PageHeader title="Confirme o convite" />
      {isLoading && <span className="loading"></span>}
      {error && <div className="professional-invitation__error">{error}</div>}
      <form
        onSubmit={handleSubmit(confirmInvatationForm)}
        className="professional-invitation__form card card--outline"
      >
        <div className="card__header">
          <h2 className="card__title">
            <AiOutlineLock /> Confirmar
          </h2>
        </div>
        <div className="professional-invitation__field">
          <input
            name="password"
            type="password"
            ref={register}
            placeholder="Senha"
            disabled={isLoading}
            className="input"
          />
          <InputFormError touched={touched.password} error={errors.password} />
        </div>
        <div className="professional-invitation__field">
          <input
            name="confirmPassword"
            type="password"
            ref={register}
            placeholder="Confirme sua senha"
            disabled={isLoading}
            className="input"
          />
          <InputFormError
            touched={touched.confirmPassword}
            error={errors.confirmPassword}
          />
        </div>
        <div>
          <button
            disabled={!isValid || !isDirty || isLoading}
            className="button button--block button--purple"
          >
            Confirmar
          </button>
        </div>
      </form>
      <div className="professional-invitation__redirect">
        <Link to="/sign-in">Entrar</Link>
      </div>
    </div>
  );
};

export default ProfessionalInvitation;
