import React, { Fragment, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import schema from './validators/account-signup.validator';
import PageHeader from '../../../../common/components/page-header';
import { handleError } from '../../../../common/utils/api';
import AuthService from '../../../../services/auth.service';
import InputFormError from '../../../../common/components/input-form-error';
import Button from '../../../../common/components/button';
import UserService from '../../../../services/user.service';
import WizardHeader from '../../../../common/components/wizard-header';

const AccountSignUp = () => {
  const [userData, setUserData] = useState({});
  const [allowBackButton, setAllowBackButton] = useState(false);
  const [wizardInstance, setWizardInstance] = useState({});

  const onStepChange = () => {
    const allow = !!(
      wizardInstance.currentStep > 1 &&
      wizardInstance.currentStep < wizardInstance.totalSteps
    );

    setAllowBackButton(allow);
  };

  return (
    <Fragment>
      <WizardHeader
        allowBackButton={allowBackButton}
        wizardInstance={wizardInstance}
      />
      <div className="wizard-wrapper m-t-16">
        <StepWizard instance={setWizardInstance} onStepChange={onStepChange}>
          <AccountSignUpEmail setUserData={setUserData} />
          <AccountSignUpValidation
            setUserData={setUserData}
            userData={userData}
          />
          <AccountSignUpConfirmation userData={userData} />
        </StepWizard>
      </div>
    </Fragment>
  );
};

const AccountSignUpEmail = ({ nextStep, setUserData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { errors, formState, register, handleSubmit } = useForm({
    resolver: yupResolver(schema.formEmail.validator),
    defaultValues: schema.formEmail.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const formSubmit = async (values) => {
    try {
      setIsLoading(true);

      const { userEmail } = values;
      const userData = {
        email: userEmail,
      };

      await UserService.verifyEmail(userData);

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
              <label className="form__label" htmlFor="userEmail">
                Digite seu e-mail
              </label>
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                ref={register}
                disabled={isLoading}
                className="input"
              />
              <InputFormError
                touched={touched.userEmail}
                error={errors.userEmail}
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

AccountSignUpEmail.propTypes = {
  nextStep: PropTypes.func,
  setUserData: PropTypes.func.isRequired,
};

const AccountSignUpValidation = ({ nextStep, setUserData, userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { errors, formState, register, handleSubmit } = useForm({
    resolver: yupResolver(schema.formSignUp.validator),
    defaultValues: schema.formSignUp.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const formSubmit = async (values) => {
    try {
      setIsLoading(true);

      const { userName, userPassword } = values;
      const user = {
        email: userData.email,
        name: userName,
        password: userPassword,
      };

      await AuthService.signUp(user);

      setUserData(user);
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
        title="Preencha as informações abaixo"
        description="Falta pouco, sua agenda online logo estará disponível."
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
              <strong>{userData.email}</strong>
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="userName">
                Digite seu nome completo
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                ref={register}
                disabled={isLoading}
                className="input"
              />
              <InputFormError
                touched={touched.userName}
                error={errors.userName}
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="userPassword">
                Escolha uma senha com no mínimo 8 caracteres
              </label>
              <input
                id="userPassword"
                name="userPassword"
                type="password"
                ref={register}
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
                <span>Continuar</span>
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
  userData: PropTypes.object,
  setUserData: PropTypes.func.isRequired,
};

const AccountSignUpConfirmation = ({ userData }) => {
  const [error, setError] = useState(null);
  const [resent, setResent] = useState(false);

  const retrySendEmail = async () => {
    try {
      await AuthService.signUp(userData);
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
