import React, { Fragment, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import schema from './validators/account-setup.validator';
import PageHeader from '../../../../common/components/page-header';
import { handleError } from '../../../../common/utils/api';
import UserService from '../../../../services/user.service';
import InputFormError from '../../../../common/components/input-form-error';
import Button from '../../../../common/components/button';
import logoSvg from '../../../../common/assets/svg/logo.svg';
import { replaceSpecialCharacters } from '../../../../common/utils/validator';

const AccountSetup = ({ token }) => {
  // const [companyData, setCompanyData] = useState(null);

  return (
    <Fragment>
      <div className="flexbox flexbox__justify--center m-b-16">
        <span className="header__logo">
          <img src={logoSvg} alt="Logo Sked App" />
        </span>
      </div>
      <div className="wizard-wrapper m-t-16">
        <StepWizard>
          <AccountSetupValidation token={token} />
          <AccountSetupUrl />
        </StepWizard>
      </div>
    </Fragment>
  );
};

AccountSetup.propTypes = {
  token: PropTypes.string,
};

const AccountSetupValidation = ({ nextStep, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  const { errors, formState, register, handleSubmit } = useForm({
    resolver: yupResolver(schema.formPassword.validator),
    defaultValues: schema.formPassword.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const formSubmit = async (values) => {
    try {
      setIsLoading(true);

      const { password } = values;
      const userData = {
        password,
        token,
      };

      await UserService.findByConfirmationToken(userData);

      setIsLoading(false);
      nextStep();
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const findByConfirmationToken = async () => {
      const { data } = await UserService.findByConfirmationToken({ token });

      setUser(data);
    };

    findByConfirmationToken();
  }, [token]);

  return (
    <div>
      {user && (
        <PageHeader
          title="Bom te ver de volta"
          description={user.name}
          titleSize="medium"
        />
      )}
      <div className="flexbox flexbox--column" style={{ overflow: 'hidden' }}>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="form flexbox__item"
        >
          {error && <div className="form__error">{error}</div>}
          <div className="card card--outline">
            <div className="form__field">
              {user && <strong>{user.email}</strong>}
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="password">
                Digite sua senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                ref={register}
                disabled={isLoading}
                className="input"
              />
              <InputFormError
                touched={touched.password}
                error={errors.password}
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
      <div className="action__link text--center m-b-32">
        <Link to="/recover-password">Esqueceu a senha? Recupere aqui</Link>
      </div>
      <div className="action__link text--center p-t-24">
        <Link to="/sign-in">Já tem uma conta? Iniciar sessão</Link>
      </div>
    </div>
  );
};

AccountSetupValidation.propTypes = {
  nextStep: PropTypes.func,
  token: PropTypes.string,
};

const AccountSetupUrl = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { errors, formState, register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema.formUrl.validator),
    defaultValues: schema.formUrl.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const formSubmit = async () => {
    try {
      setIsLoading(true);
      setIsLoading(false);
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Bem vindo ao SKED"
        description="Crie o endereço de sua agenda online"
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
              <label className="form__label" htmlFor="password">
                Escolha um URL que seja curto e fácil de memorizar que
                represente você ou seu negócio de forma concisa para facilitar o
                compartilhamento
              </label>
              <div className="grouped-button">
                <label htmlFor="account-url" className="grouped-button__label">
                  agenda.skedapp.com.br/
                </label>
                <input
                  name="url"
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
        <Link>Ignorar</Link>
      </div>
    </div>
  );
};

export default AccountSetup;
