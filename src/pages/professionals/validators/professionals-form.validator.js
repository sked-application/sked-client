import * as Yup from 'yup';

export default {
  form: {
    initialValues: {
      name: '',
      email: '',
    },
    validator: Yup.object({
      name: Yup.string().required('Este campo é obrigatório'),
      email: Yup.string()
        .required('Por favor, digite um email.')
        .email('Por favor, digite um email válido.'),
    }),
  },
};
