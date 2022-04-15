import * as Yup from 'yup';
import { phoneRegex } from '../../../common/utils/validator';

export default {
  form: {
    initialValues: {
      name: '',
      email: '',
      telephone: '',
      password: '',
      confirmPassword: '',
    },
    validator: Yup.object({
      name: Yup.string().required('Por favor, digite seu nome.'),
      email: Yup.string()
        .required('Por favor, digite seu email.')
        .email('Por favor, digite um email válido.'),
      telephone: Yup.string().test(
        'telephone',
        'Por favor, verifique o número de telefone.',
        (value) => {
          if (value) {
            return phoneRegex(value);
          }

          return true;
        },
      ),
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
