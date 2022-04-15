import * as Yup from 'yup';

export default {
  formPassword: {
    initialValues: {
      password: '',
    },
    validator: Yup.object({
      password: Yup.string().required('Este campo é obrigatório'),
    }),
  },
  formUrl: {
    initialValues: {
      url: '',
    },
    validator: Yup.object({
      url: Yup.string().required('Este campo é obrigatório'),
    }),
  },
};
