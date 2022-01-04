import React, { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai';
import AuthService from '../../services/auth.service';
import schema from './validators/customer-sign-in.validator';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';
import { AuthContext } from '../../common/contexts/auth';
import { handleError } from '../../common/utils/api';

import './customer-sign-in.page.scss';

const CustomerSignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const AUTH = useContext(AuthContext);

  const { register, handleSubmit, formState, errors } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const signInForm = async (values) => {
    try {
      setIsLoading(true);

      const { email, password } = values;
      const { data } = await AuthService.customerSignIn({
        email,
        password,
      });

      AUTH.handleSignIn(data);
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <PageHeader
        title="Sou cliente"
        description="Gerencie seus compromissos."
      />
      {isLoading && <span className="loading"></span>}
      {error && <div className="customer-sign-in__error">{error}</div>}
      <form
        onSubmit={handleSubmit(signInForm)}
        className="customer-sign-in__form card card--outline"
      >
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
            className="input"
          />
          <InputFormError touched={touched.email} error={errors.email} />
        </div>
        <div className="customer-sign-in__field">
          <input
            name="password"
            type="password"
            ref={register}
            placeholder="Password"
            disabled={isLoading}
            className="input"
          />
          <InputFormError touched={touched.password} error={errors.password} />
        </div>
        <div className="customer-sign-in__forgot-password">
          <Link to="/recover-password-customer">Esqueceu a senha?</Link>
        </div>
        <div className="customer-sign-in__field">
          <button
            type="submit"
            disabled={!isValid || !isDirty || isLoading}
            className="button button--block button--purple"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerSignIn;
