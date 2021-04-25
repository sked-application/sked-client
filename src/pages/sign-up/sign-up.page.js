import React, { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AiOutlineForm } from 'react-icons/ai';
import { Link, Redirect, useHistory } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import schema from './validators/sign-up.validator';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';
import { AuthContext } from '../../common/contexts/auth';
import { replaceSpecialCharacters } from '../../common/utils/validator';
import { handleError } from '../../common/utils/api';
import InputTelephone from '../../common/components/input-telephone';
import { telephoneMask } from '../../common/utils/telephone-mask';
import './sign-up.page.scss';

const SignUp = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, userAccountUrl } = useContext(AuthContext);

  const { errors, formState, setValue, register, handleSubmit } = useForm({
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
        companyPlan,
        companyTelephone,
        userName,
        userEmail,
        userPassword,
      } = values;

      await AuthService.signUp({
        company: {
          name: companyName,
          url: companyUrl,
          plan: companyPlan,
          telephone: replaceSpecialCharacters(companyTelephone) || null,
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
          <InputTelephone
            id="companyTelephone"
            name="companyTelephone"
            className="input input--dark"
            ref={register}
            onChange={(event) =>
              setValue('companyTelephone', telephoneMask(event.target.value))
            }
          />
          <InputFormError
            touched={touched.companyTelephone}
            error={errors.companyTelephone}
          />
        </div>
        <div className="sign-up__field">
          <select
            name="companyPlan"
            ref={register}
            disabled={isLoading}
            className="input"
          >
            <option value="">Escolha seu plano</option>
            <option value="TRIAL">Avaliação gratuíta (30 dias)</option>
            <option value="DEFAULT">Padrão (R$ 19,90)</option>
            <option value="CUSTOM">Personalizado (R$ 49,90)</option>
          </select>
          <InputFormError
            touched={touched.companyPlan}
            error={errors.companyPlan}
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
