import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Wizard, useWizard } from 'react-use-wizard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageHeader from '../../../../shared/components/page-header';
import { handleError } from '../../../../api/api.utils';
import AuthService from '../../../../modules/auth/auth.services';
import Button from '../../../../shared/components/button';
import UserService from '../../../../services/user.service';
import WizardHeader from '../../../../shared/components/wizard-header';
import AnimatedWrapper from '../../../../shared/components/animated-wrapper';
import Input from '../../../../shared/components/input';
import { emailRegex } from '../../../../shared/utils/validator';

const AccountSignUp = () => {
  const [userData, setUserData] = useState({});

  return (
    <Wizard header={<WizardHeader />}>
      <AnimatedWrapper>
        <AccountSignUpEmail setUserData={setUserData} userData={userData} />
      </AnimatedWrapper>
      <AnimatedWrapper>
        <AccountSignUpValidation
          setUserData={setUserData}
          userData={userData}
        />
      </AnimatedWrapper>
      <AnimatedWrapper>
        <AccountSignUpConfirmation userData={userData} />
      </AnimatedWrapper>
    </Wizard>
  );
};

const AccountSignUpEmail = ({ setUserData, userData }) => {
  const { nextStep } = useWizard();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      userEmail: '',
    },
    mode: 'onSubmit',
  });

  const formSubmit = async (values) => {
    try {
      setIsLoading(true);

      const userData = {
        email: values.userEmail,
      };

      await UserService.verifyEmail(userData);

      if (error) setError(null);
      setUserData(userData);
      setIsLoading(false);
      nextStep();
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData.email) {
      setValue('userEmail', userData.email, { shouldDirty: true });
    }
  }, [userData.email, setValue]);

  return (
    <div className="container mx-auto px-4 max-w-md">
      <PageHeader
        title="Comece a usar o SKED"
        description="Realize seu cadastro com poucos passos e tenha sua agenda online disponível em instantes."
        titleSize="medium"
      />
      <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
        <form onSubmit={handleSubmit(formSubmit)}>
          {error && <div className="mb-2 text-red-500">{error}</div>}
          <div className="mb-4">
            <label htmlFor="userEmail">Digite seu email</label>
            <Input
              id="userEmail"
              disabled={isLoading}
              className="input"
              fieldName="userEmail"
              errors={errors}
              {...register('userEmail', {
                required: 'Este campo é obrigatório.',
                pattern: {
                  value: emailRegex,
                  message: 'Insira um email válido.',
                },
              })}
            />
          </div>
          <div>
            <Button
              type="submit"
              disabled={!isDirty || isLoading}
              isLoading={isLoading}
              className="button button--block button--primary"
            >
              <span>Cadastre-se</span>
            </Button>
          </div>
        </form>
      </div>
      <div className="text-center mb-6">
        <span className="mr-1">Já é cadastrado?</span>
        <Link to="/sign-in" className="font-semibold">
          Iniciar sessão
        </Link>
      </div>
    </div>
  );
};

AccountSignUpEmail.propTypes = {
  setUserData: PropTypes.func.isRequired,
  userData: PropTypes.object,
};

const AccountSignUpValidation = ({ setUserData, userData }) => {
  const { nextStep } = useWizard();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    formState: { isDirty, errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: '',
      userPassword: '',
    },
    mode: 'onSubmit',
  });

  const formSubmit = async (values) => {
    try {
      setIsLoading(true);

      const user = {
        email: userData.email,
        name: values.userName,
        password: values.userPassword,
      };

      await AuthService.signUp(user);

      if (error) setError(null);
      setUserData(user);
      setIsLoading(false);
      nextStep();
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md">
      <PageHeader
        title="Preencha as informações abaixo"
        description="Falta pouco, sua agenda online logo estará disponível."
        titleSize="medium"
      />
      <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
        <form onSubmit={handleSubmit(formSubmit)}>
          {error && <div className="mb-2 text-red-500">{error}</div>}
          <div className="mb-2">
            <span className="font-semibold">{userData.email}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="userName">Digite seu nome completo</label>
            <Input
              id="userName"
              disabled={isLoading}
              className="input"
              fieldName="userName"
              errors={errors}
              {...register('userName', {
                required: 'Este campo é obrigatório.',
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userPassword">
              Escolha uma senha com no mínimo 8 caracteres
            </label>
            <Input
              id="userPassword"
              type="password"
              disabled={isLoading}
              className="input"
              fieldName="userPassword"
              errors={errors}
              {...register('userPassword', {
                required: 'Este campo é obrigatório.',
                minLength: {
                  value: 8,
                  message: 'Este campo deve conter ao menos 8 caracteres',
                },
              })}
            />
          </div>
          <div>
            <Button
              type="submit"
              disabled={!isDirty || isLoading}
              isLoading={isLoading}
              className="button button--block button--primary"
            >
              <span>Continuar</span>
            </Button>
          </div>
        </form>
      </div>
      <div className="text-center mb-6">
        <span className="mr-1">Já é cadastrado?</span>
        <Link to="/sign-in" className="font-semibold">
          Iniciar sessão
        </Link>
      </div>
    </div>
  );
};

AccountSignUpValidation.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func.isRequired,
};

const AccountSignUpConfirmation = ({ userData }) => {
  const [error, setError] = useState(null);
  const [resent, setResent] = useState(false);

  const retrySendEmail = async () => {
    try {
      await AuthService.signUp(userData);

      if (error) setError(null);
      setResent(true);
    } catch (error) {
      setError(handleError(error));
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md text-center">
      <PageHeader
        title="Agora é só verificar seu email"
        description={`Enviamos um email para o endereço: ${userData.email}`}
        titleSize="medium"
      />
      {error && <div className="mb-2 text-red-500">{error}</div>}
      <div>
        {resent ? (
          <span className="text-green-600">Reenviado com sucesso</span>
        ) : (
          <div className="mb-6">
            <span className="mr-1">Não recebeu o email?</span>
            <a className="font-semibold" onClick={retrySendEmail}>
              Reenviar
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

AccountSignUpConfirmation.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default AccountSignUp;
