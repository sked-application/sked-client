import * as Yup from 'yup';

export default {
  form: {
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validator: Yup.object({
      password: Yup.string()
        .required('Este campo é obrigatório')
        .min(8, 'Este campo deve conter ao menos 8 caracteres'),
      confirmPassword: Yup.string()
        .required('Este campo é obrigatório')
        .min(8, 'Este campo deve conter ao menos 8 caracteres')
        .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
    }),
  },
};
