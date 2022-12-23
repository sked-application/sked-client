import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import PageHeader from '../../common/components/page-header';
import { handleError } from '../../common/utils/api';
import { emailRegex } from '../../common/utils/validator';
import Input from '../../common/components/input';
import Button from '../../common/components/button';

const RecoverPassword = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { email: '' },
    mode: 'onSubmit',
  });

  const recoverPasswordForm = async (values) => {
    try {
      setIsLoading(true);

      const { email } = values;
      const { message } = await AuthService.sendRecoverEmail({
        email,
      });

      reset();
      setIsLoading(false);
      setSuccess(message);

      if (error) {
        setError('');
      }
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);

      if (success) {
        setSuccess('');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md flex-1">
      <PageHeader
        title="Esqueci a senha"
        description="Um link de recuperação será enviado para seu email."
      />
      {error && <div className="mb-2 text-red-500">{error}</div>}
      {success && <div className="mb-2 text-green-600">{success}</div>}
      <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
        <form onSubmit={handleSubmit(recoverPasswordForm)}>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              className="input"
              disabled={isLoading}
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
          <div>
            <Button
              disabled={!isDirty || isLoading}
              isLoading={isLoading}
              className="button button--block button--primary"
            >
              <span>Enviar</span>
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

export default RecoverPassword;
