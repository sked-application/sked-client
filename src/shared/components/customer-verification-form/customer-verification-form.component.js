import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import AuthService from '../../../modules/auth/auth.services';
import { handleError } from '../../../api/api.utils';
import Button from '../button';
import Input from '../input';
import { useWizard } from 'react-use-wizard';

const CustomerVerificationForm = ({
  isValidToSubmit,
  onSubmit,
  customerSignInData,
}) => {
  const { previousStep } = useWizard();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
    setFocus,
  } = useForm({
    defaultValues: {
      name: customerSignInData.name || '',
      confirmationSmsCode: '',
    },
    mode: 'onSubmit',
  });

  const signInForm = async (values) => {
    try {
      if (!isValidToSubmit()) {
        return;
      }

      setIsLoading(true);

      const { name, confirmationSmsCode } = values;
      const { data } = await AuthService.customerSignIn({
        name,
        confirmationSmsCode,
      });

      reset();
      setIsLoading(false);
      onSubmit(data);
    } catch (error) {
      alert(handleError(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!customerSignInData.name) {
      setFocus('name');
      return;
    }

    setFocus('confirmationSmsCode');
  }, [customerSignInData.name, setFocus]);

  return (
    <div>
      <form onSubmit={handleSubmit(signInForm)}>
        <div>
          <label className="font-semibold" htmlFor="name">
            {customerSignInData.name
              ? `Olá ${customerSignInData.name}`
              : 'Digite seu nome'}
          </label>
          <Input
            id="name"
            type={customerSignInData.name ? 'hidden' : 'text'}
            className="input"
            fieldName="name"
            errors={errors}
            {...register('name', {
              required: 'Este campo é obrigatório.',
            })}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="confirmationSmsCode">
            Digite o código enviado para seu telefone.
          </label>
          <Input
            id="confirmationSmsCode"
            className="input"
            fieldName="confirmationSmsCode"
            errors={errors}
            {...register('confirmationSmsCode', {
              required: 'Este campo é obrigatório.',
            })}
          />
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            disabled={!isDirty || isLoading}
            isLoading={isLoading}
            className="button button--block button--primary"
          >
            <span>Avançar</span>
          </Button>
        </div>
        <div className="text-center mt-4">
          <span className="mr-1">Não recebeu o sms?</span>
          <span
            className="font-semibold cursor-pointer"
            onClick={() => previousStep()}
          >
            Enviar novamente.
          </span>
        </div>
      </form>
    </div>
  );
};

CustomerVerificationForm.propTypes = {
  isValidToSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  customerSignInData: PropTypes.object.isRequired,
};

export default CustomerVerificationForm;
