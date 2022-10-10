import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams, useHistory } from 'react-router-dom';
import UserService from '../../services/user.service';
import PageHeader from '../../common/components/page-header';
import { handleError } from '../../common/utils/api';
import Input from '../../common/components/input';
import Button from '../../common/components/button';

const ProfessionalInvitation = () => {
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
    defaultValues: {
      password: '',
    },
    mode: 'onSubmit',
  });

  const confirmInvatationForm = async (values) => {
    try {
      setIsLoading(true);

      const { password } = values;
      await UserService.confirmInvitation({
        password,
        token,
      });

      reset();
      setIsLoading(false);

      history.push('/sign-in');
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md flex-1">
      <PageHeader title="Confirme o convite" />
      {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
      <div className="mb-4 border divide-solid border-stone-200 rounded-xl p-4">
        <form onSubmit={handleSubmit(confirmInvatationForm)}>
          <div className="mb-4">
            <label className="text-sm" htmlFor="password">
              Senha
            </label>
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
          <Button
            disabled={!isDirty || isLoading}
            isLoading={isLoading}
            className="button button--block button--primary"
          >
            <span>Confirmar</span>
          </Button>
        </form>
      </div>
      <div className="text-center mb-6">
        <span className="text-sm mr-1">Já é cadastrado?</span>
        <Link to="/sign-in" className="font-semibold">
          Iniciar sessão
        </Link>
      </div>
    </div>
  );
};

export default ProfessionalInvitation;
