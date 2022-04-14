import React, { Fragment, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import schema from './validators/account-validation.validator';
import PageHeader from '../../../../common/components/page-header';
import { handleError } from '../../../../common/utils/api';
import authService from '../../../../services/auth.service';
import InputFormError from '../../../../common/components/input-form-error';
import Button from '../../../../common/components/Button';
import logoSvg from '../../../../common/assets/svg/logo.svg';

const AccountSignUp = () => {
  const [userData, setUserData] = useState({});

  return (
    <Fragment>
      <div className="flexbox flexbox__justify--center m-b-16">
        <span className="header__logo">
          <img src={logoSvg} alt="Logo Sked App" />
        </span>
      </div>
      <div className="wizard-wrapper m-t-16">
        <StepWizard>
          <AccountSignUpValidation setUserData={setUserData} />
          <AccountSignUpConfirmation userData={userData} />
        </StepWizard>
      </div>
    </Fragment>
  );
};

const AccountSignUpValidation = ({ nextStep, setUserData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { errors, formState, register, handleSubmit } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const formSubmit = async (values) => {
    try {
      setIsLoading(true);

      const { userName, userEmail, userPassword } = values;
      const userData = {
        email: userEmail,
        name: userName,
        password: userPassword,
      };

      await authService.signUp(userData);

      setUserData(userData);
      setIsLoading(false);
      nextStep();
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Comece a usar o SKED"
        description="Realize seu cadastro com poucos passos e tenha sua agenda online disponível em instantes."
        titleSize="medium"
      />
      <div className="flexbox flexbox--column" style={{ overflow: 'hidden' }}>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="form flexbox__item"
        >
          {error && <div className="form__error">{error}</div>}
          <div className="card card--outline">
            <div className="form__field">
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
            <div className="form__field">
              <input
                name="userName"
                type="text"
                ref={register}
                placeholder="Nome"
                disabled={isLoading}
                className="input"
              />
              <InputFormError
                touched={touched.userName}
                error={errors.userName}
              />
            </div>
            <div className="form__field">
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
            <div>
              <Button
                type="submit"
                disabled={!isValid || !isDirty || isLoading}
                isLoading={isLoading}
                className="button button--block button--purple"
              >
                <span>Cadastre-se</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="action__link text--center">
        <Link to="/sign-in">Já tem uma conta? Iniciar sessão</Link>
      </div>
    </div>
  );
};

AccountSignUpValidation.propTypes = {
  nextStep: PropTypes.func,
  setUserData: PropTypes.func.isRequired,
};

const AccountSignUpConfirmation = ({ userData }) => {
  const [error, setError] = useState(null);
  const [resent, setResent] = useState(false);

  const retrySendEmail = async () => {
    try {
      await authService.signUp(userData);
      setResent(true);
    } catch (error) {
      setError(handleError(error));
    }
  };

  return (
    <div>
      <PageHeader
        title="Precisamos verificar seu e-mail"
        description={`Enviamos um e-mail para o endereço: ${userData.email}`}
        titleSize="medium"
      />
      {error && <div className="sign-up__error">{error}</div>}
      <div className="action__link text--center">
        {resent ? (
          <span>Reenviado com sucesso</span>
        ) : (
          <a onClick={retrySendEmail}>Não recebeu o e-mail? Reenviar</a>
        )}
      </div>
    </div>
  );
};

AccountSignUpConfirmation.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default AccountSignUp;
