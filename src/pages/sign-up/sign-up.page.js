import React, { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineForm } from 'react-icons/ai';
import { Link, Redirect, useHistory } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import schema from './validators/sign-up.validator';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';
import { AuthContext } from '../../common/contexts/auth';
import { replaceSpecialCharacters } from '../../common/utils/validator';
import { handleError } from '../../common/utils/api';
import { cpfCnpjMask } from '../../common/utils/cpf-cnpf';

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
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

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
          cpfCnpj: replaceSpecialCharacters(companyCpfCnpj),
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
          <InputFormError
            touched={touched.companyUrl}
            error={errors.companyUrl}
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
          <InputFormError
            touched={touched.companyName}
            error={errors.companyName}
          />
        </div>
        <div className="sign-up__field">
          <input
            name="companyCpfCnpj"
            type="text"
            ref={register}
            placeholder="Cpf/Cnpj da conta sem pontos e barra"
            className="input input--dark"
            onChange={(event) =>
              setValue('companyCpfCnpj', cpfCnpjMask(event.target.value))
            }
          />
          <InputFormError
            touched={touched.companyCpfCnpj}
            error={errors.companyCpfCnpj}
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
          <InputFormError
            touched={touched.companyTelephone}
            error={errors.companyTelephone}
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
          <InputFormError touched={touched.userName} error={errors.userName} />
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
          <InputFormError
            touched={touched.userEmail}
            error={errors.userEmail}
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
          <InputFormError
            touched={touched.userPassword}
            error={errors.userPassword}
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
          <InputFormError
            touched={touched.userConfirmPassword}
            error={errors.userConfirmPassword}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={!isValid || !isDirty || isLoading}
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
