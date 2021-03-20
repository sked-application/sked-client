import React, { useContext, useState } from 'react';
import AuthService from '../../services/auth.service';
import schema from './validators/sign-up.validator';
import NumberFormat from 'react-number-format';
import PageHeader from '../../components/page-header-component/page-header.component';
import FormInputError from '../../components/input-form-error-component/input-form-error.component';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/auth-context/auth.context';
import { replaceSpecialCharacters } from '../../utils/utils';
import { AiOutlineForm } from 'react-icons/ai';
import { handleError } from '../../utils/api';
import { Link, Redirect, useHistory } from 'react-router-dom';

import './sign-up.page.scss';

const SignUp = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, userAccountUrl } = useContext(AuthContext);

  const {
    errors,
    control,
    formState,
    setValue,
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'all',
  });

  const signUpForm = async (values) => {
    try {
      setIsLoading(true);

      const {
        companyName,
        companyUrl,
        companyCpfCnpj,
        companyTelephone,
        userName,
        userEmail,
        userPassword,
      } = values;

      await AuthService.signUp({
        company: {
          name: companyName,
          url: companyUrl,
          cpfCnpj: companyCpfCnpj,
          telephone: companyTelephone,
        },
        user: {
          name: userName,
          email: userEmail,
          password: userPassword,
        },
      });

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
      <PageHeader
        title="Solicite sua conta"
        description="Retornaremos a liberação de sua conta em instantes.."
      />
      {isLoading && <span className="loading"></span>}
      {error && <div className="sign-up__error">{error}</div>}
      <form
        onSubmit={handleSubmit(signUpForm)}
        className="sign-up__form card card--outline"
      >
        <div className="card__header">
          <h2 className="card__title">
            <AiOutlineForm /> Cadastre-se
          </h2>
        </div>
        <div className="sign-up__title">Informações da conta</div>
        <div className="sign-up__field">
          <div className="grouped-button">
            <label htmlFor="account-url" className="grouped-button__label">
              skedapp.com.br/
            </label>
            <input
              name="companyUrl"
              type="text"
              ref={register}
              placeholder="conta"
              disabled={isLoading}
              id="account-url"
              className="grouped-button__input"
              onBlur={(event) =>
                setValue(
                  'companyUrl',
                  replaceSpecialCharacters(event.target.value),
                )
              }
            />
          </div>
          <FormInputError
            error={errors.companyUrl && errors.companyUrl.message}
          />
        </div>
        <div className="sign-up__field">
          <input
            name="companyName"
            type="text"
            ref={register}
            placeholder="Nome de seu estabelecimento"
            disabled={isLoading}
            className="input"
          />
          <FormInputError
            error={errors.companyName && errors.companyName.message}
          />
        </div>
        <div className="sign-up__field">
          <input
            name="companyCpfCnpj"
            type="text"
            ref={register}
            placeholder="Cpf/Cnpj da conta sem pontos e barra"
            className="input input--dark"
          />
          <FormInputError
            error={errors.companyCpfCnpj && errors.companyCpfCnpj.message}
          />
        </div>
        <div className="sign-up__field">
          <Controller
            id="accountTelephone"
            name="companyTelephone"
            control={control}
            as={
              <NumberFormat
                format="(##) #####-####"
                mask="_"
                type="tel"
                className="input input--dark"
                placeholder="Telefone"
              />
            }
          />
          <FormInputError
            error={errors.companyTelephone && errors.companyTelephone.message}
          />
        </div>
        <div className="sign-up__title">
          <strong>Informações do usuário</strong>
        </div>
        <div className="sign-up__field">
          <input
            name="userName"
            type="text"
            ref={register}
            placeholder="Nome"
            disabled={isLoading}
            className="input"
          />
          <FormInputError error={errors.userName && errors.userName.message} />
        </div>
        <div className="sign-up__field">
          <input
            name="userEmail"
            type="email"
            ref={register}
            placeholder="Email"
            disabled={isLoading}
            className="input"
          />
          <FormInputError
            error={errors.userEmail && errors.userEmail.message}
          />
        </div>
        <div className="sign-up__field">
          <input
            name="userPassword"
            type="password"
            ref={register}
            placeholder="Senha"
            disabled={isLoading}
            className="input"
          />
          <FormInputError
            error={errors.userPassword && errors.userPassword.message}
          />
        </div>
        <div className="sign-up__field">
          <input
            name="userConfirmPassword"
            type="password"
            ref={register}
            placeholder="Confirme sua senha"
            disabled={isLoading}
            className="input"
          />
          <FormInputError
            error={
              errors.userConfirmPassword && errors.userConfirmPassword.message
            }
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={!formState.isValid || isLoading}
            className="button button--block button--purple"
          >
            Cadastrar
          </button>
        </div>
      </form>
      <div className="sign-up__redirect">
        <Link to="/sign-in">Entrar</Link>
      </div>
    </div>
  );
};

export default SignUp;
