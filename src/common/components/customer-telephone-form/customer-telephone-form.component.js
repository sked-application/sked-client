import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useWizard } from 'react-use-wizard';
import { useForm } from 'react-hook-form';
import Button from '../button';
import Input from '../input';
import AuthService from '../../../services/auth.service';
import { handleError } from '../../utils/api';
import { telephoneMask } from '../../utils/telephone-mask';
import { phoneRegex, replaceSpecialCharacters } from '../../utils/validator';

const CustomerSignUpForm = ({ isValidToSubmit, onSubmit }) => {
  const { nextStep } = useWizard();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    setValue,
  } = useForm({
    defaultValues: {
      telephone: '',
    },
    mode: 'onSubmit',
  });

  const signUpForm = async (values) => {
    try {
      if (!isValidToSubmit()) {
        return;
      }

      setIsLoading(true);
      const { data } = await AuthService.customerSignUp({
        telephone: values.telephone,
      });

      setIsLoading(false);
      onSubmit(data);
      nextStep();
    } catch (error) {
      alert(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(signUpForm)}>
      <div className="mb-4">
        <label className="text-sm" htmlFor="telephone">
          Telefone
        </label>
        <Input
          id="telephone"
          type="tel"
          className="input"
          fieldName="telephone"
          errors={errors}
          {...register('telephone', {
            required: 'Este campo é obrigatório',
            onChange: (event) =>
              setValue('telephone', telephoneMask(event.target.value)),
            validate: (value) =>
              phoneRegex(value) || 'Por favor, verifique o número de telefone.',
            setValueAs: (value) => replaceSpecialCharacters(value) || null,
          })}
        />
      </div>
      <Button
        type="submit"
        disabled={!isDirty}
        isLoading={isLoading}
        className="button button--block button--primary"
      >
        <span>Avançar</span>
      </Button>
    </form>
  );
};

CustomerSignUpForm.propTypes = {
  isValidToSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CustomerSignUpForm;