import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../validators/customer-sign-in.validator';
import AuthService from '../../../../services/auth.service';
import InputFormError from '../../../../common/components/input-form-error';
import { handleError } from '../../../../common/utils/api';
import { AuthContext } from '../../../../common/contexts/auth';
import { Link } from 'react-router-dom';

const CustomerSignInForm = ({ setIsLoading, setFormType }) => {
  const AUTH = useContext(AuthContext);

  const { register, handleSubmit, formState, errors, reset } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const signInForm = async (values) => {
    try {
      setIsLoading(true);

      const { email, password } = values;
      const { data } = await AuthService.customerSignIn({
        email,
        password,
      });

      reset();
      setIsLoading(false);
      AUTH.handleSignIn(data);
    } catch (error) {
      alert(handleError(error));
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(signInForm)}>
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
          name="password"
          type="password"
          ref={register}
          placeholder="Senha"
          className="input input--dark"
          autoComplete="off"
        />
        <InputFormError touched={touched.password} error={errors.password} />
      </div>
      <div className="m-t-16 sign-in__forgot-password">
        <Link to="/recover-password">Esqueceu a senha?</Link>
      </div>
      <div className="m-t-16">
        <button
          type="submit"
          className="button button--block button--purple"
          disabled={!isValid || !isDirty}
        >
          Entrar
        </button>
      </div>
      <div className="text--center m-t-25 m-b-16">
        <div
          onClick={() => setFormType('SIGN_UP')}
          className="cursor--pointer color--purple"
        >
          <strong>Não tenho cadastro</strong>
        </div>
      </div>
    </form>
  );
};

CustomerSignInForm.propTypes = {
  setIsLoading: PropTypes.func,
  setFormType: PropTypes.func,
};

export default CustomerSignInForm;
