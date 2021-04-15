import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../validators/customer-sign-up.validator';
import AuthService from '../../../../services/auth.service';
import InputFormError from '../../../../common/components/input-form-error';
import { handleError } from '../../../../common/utils/api';
import { AuthContext } from '../../../../common/contexts/auth';
import InputTelephone from '../../../../common/components/input-telephone';
import { telephoneMask } from '../../../../common/utils/telephone-mask';
import { replaceSpecialCharacters } from '../../../../common/utils/validator';

const CustomerSignUpForm = ({ setIsLoading, setFormType }) => {
  const { handleSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState,
    errors,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const signUpForm = async (values) => {
    try {
      setIsLoading(true);
      const { email, name, telephone, password } = values;

      const { data } = await AuthService.customerSignUp({
        email,
        name,
        telephone: replaceSpecialCharacters(telephone) || null,
        password,
      });

      reset();
      setIsLoading(false);
      handleSignIn(data);
      alert('Cadastro realizado com sucesso, realize agora seu agendamento!');
    } catch (error) {
      alert(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(signUpForm)}>
      <div className="m-t-16">
        <input
          name="email"
          type="email"
          ref={register}
          placeholder="Email"
          className="input input--dark"
          autoComplete="off"
        />
        <InputFormError touched={touched.email} error={errors.email} />
      </div>
      <div className="m-t-16">
        <input
          name="name"
          type="text"
          ref={register}
          placeholder="Nome"
          className="input input--dark"
        />
        <InputFormError touched={touched.name} error={errors.name} />
      </div>
      <div className="m-t-16">
        <InputTelephone
          id="telephone"
          name="telephone"
          className="input input--dark"
          ref={register}
          onChange={(event) =>
            setValue('telephone', telephoneMask(event.target.value))
          }
        />
        <InputFormError touched={touched.telephone} error={errors.telephone} />
      </div>
      <div className="m-t-16">
        <input
          name="password"
          type="password"
          ref={register}
          placeholder="Senha"
          className="input input--dark"
          autoComplete="off"
        />
        <InputFormError touched={touched.password} error={errors.password} />
      </div>
      <div className="m-t-16">
        <input
          name="confirmPassword"
          type="password"
          ref={register}
          placeholder="Confirme sua senha"
          className="input input--dark"
          autoComplete="off"
        />
        <InputFormError
          touched={touched.confirmPassword}
          error={errors.confirmPassword}
        />
      </div>
      <div className="m-t-16">
        <button
          type="submit"
          className="button button--block button--purple"
          disabled={!isValid || !isDirty}
        >
          Casdastrar
        </button>
      </div>
      <div className="text--center m-t-25 m-b-16">
        <div
          onClick={() => setFormType('SIGN_IN')}
          className="cursor--pointer color--purple"
        >
          <strong>Já sou cliente</strong>
        </div>
      </div>
    </form>
  );
};

CustomerSignUpForm.propTypes = {
  setIsLoading: PropTypes.func,
  setFormType: PropTypes.func,
};

export default CustomerSignUpForm;
