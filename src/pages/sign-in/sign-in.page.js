import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthService from '../../modules/auth/auth.services';
import PageHeader from '../../shared/components/page-header';
import { AuthContext } from '../../contexts/auth';
import { handleError } from '../../api/api.utils';
import Input from '../../shared/components/input';
import { emailRegex } from '../../shared/utils/validator';
import Button from '../../shared/components/button';

const SignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { AUTH_DISPATCH, AUTH_ACTIONS } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const signInForm = async (values) => {
    try {
      setIsLoading(true);

      const { email, password } = values;
      const { data } = await AuthService.signIn({
        email,
        password,
      });

      AUTH_DISPATCH({
        type: AUTH_ACTIONS.SET_SIGN_IN,
        value: { token: data },
      });
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md flex-1">
      <PageHeader
        title="Entrar como profissional"
        description="Gerencie seus agendamentos."
      />
      {error && <div className="mb-2 text-red-500">{error}</div>}
      <div className="mb-4 border divide-solid border-stone-200 rounded-xl p-4">
        <form onSubmit={handleSubmit(signInForm)}>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              disabled={isLoading}
              className="input"
              fieldName="email"
              errors={errors}
              {...register('email', {
                required: 'Este campo é obrigatório.',
                pattern: {
                  value: emailRegex,
                  message: 'Insira um email válido.',
                },
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Senha</label>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              className="input"
              fieldName="password"
              errors={errors}
              {...register('password', {
                required: 'Este campo é obrigatório.',
              })}
            />
          </div>
          <div className="mb-4">
            <Link to="/recover-password">Esqueceu a senha?</Link>
          </div>
          <div>
            <Button
              type="submit"
              disabled={!isDirty || isLoading}
              isLoading={isLoading}
              className="button button--block button--primary"
            >
              <span>Entrar</span>
            </Button>
          </div>
        </form>
      </div>
      <div className="text-center mb-6">
        <span className="mr-1">Ainda não tem uma conta?</span>
        <Link to="/sign-up" className="font-semibold">
          Cadastrar-se
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
