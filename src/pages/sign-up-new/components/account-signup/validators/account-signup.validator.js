import * as Yup from 'yup';

export default {
  formEmail: {
    initialValues: {
      userEmail: '',
    },
    validator: Yup.object({
      userEmail: Yup.string()
        .required('Por favor, digite seu email.')
        .email('Por favor, digite um email válido.'),
    }),
  },
  formSignUp: {
    initialValues: {
      userName: '',
      userPassword: '',
    },
    validator: Yup.object({
      userName: Yup.string().required('Este campo é obrigatório'),
      userPassword: Yup.string()
        .required('Este campo é obrigatório')
        .min(8, 'Este campo deve conter ao menos 8 caracteres'),
    }),
  },
};
