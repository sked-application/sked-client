import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../../modules/auth/auth.services';
import PageHeader from '../../shared/components/page-header';
import { handleError } from '../../api/api.utils';
import { Link, useParams, useHistory } from 'react-router-dom';
import Input from '../../shared/components/input';
import Button from '../../shared/components/button';

const ResetPassword = () => {
  const history = useHistory();
  const { token } = useParams();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { password: '' },
    mode: 'onSubmit',
  });

  const resetPasswordForm = async (values) => {
    try {
      setIsLoading(true);

      const { password } = values;
      const { data } = await AuthService.resetPassword({
        password,
        token,
      });

      reset();
      setIsLoading(false);

      if (data?.role === 'CUSTOMER') {
        history.push('/customer-sign-in');
        return;
      }

      history.push('/sign-in');
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md flex-1">
      <PageHeader
        title="Redefina uma nova senha"
        description="Sua senha deve conter no mínimo 8 caracteres."
      />
      {error && <div className="mb-2 text-red-500">{error}</div>}
      <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
        <form onSubmit={handleSubmit(resetPasswordForm)}>
          <div className="mb-4">
            <label htmlFor="password">Nova senha</label>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              className="input"
              fieldName="password"
              errors={errors}
              {...register('password', {
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
              disabled={!isDirty || isLoading}
              isLoading={isLoading}
              className="button button--block button--primary"
            >
              <span>Redefinir</span>
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

export default ResetPassword;
