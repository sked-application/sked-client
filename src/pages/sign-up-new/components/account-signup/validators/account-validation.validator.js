import * as Yup from 'yup';

export default {
  form: {
    initialValues: {
      userEmail: '',
      userName: '',
      userPassword: '',
    },
    validator: Yup.object({
      userEmail: Yup.string()
        .required('Por favor, digite seu email.')
        .email('Por favor, digite um email válido.'),
      userName: Yup.string().required('Este campo é obrigatório'),
      userPassword: Yup.string()
        .required('Este campo é obrigatório')
        .min(4, 'Este campo deve conter ao menos 4 caracteres'),
    }),
  },
};
