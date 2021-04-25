import * as Yup from 'yup';
import { phoneRegex } from '../../../common/utils/validator';

export default {
  form: {
    initialValues: {
      companyUrl: '',
      companyPlan: '',
      companyName: '',
      companyTelephone: '',
      userName: '',
      userEmail: '',
      userPassword: '',
      userConfirmPassword: '',
    },
    validator: Yup.object({
      companyUrl: Yup.string().required('Este campo é obrigatório'),
      companyName: Yup.string().required('Este campo é obrigatório'),
      companyPlan: Yup.string().required('Este campo é obrigatório'),
      companyTelephone: Yup.string().test(
        'company-telephone',
        'Por favor, verifique o número de telefone.',
        (value) => {
          if (value) {
            return phoneRegex(value);
          }

          return true;
        },
      ),
      userName: Yup.string().required('Este campo é obrigatório'),
      userEmail: Yup.string()
        .required('Por favor, digite seu email.')
        .email('Por favor, digite um email válido.'),
      userPassword: Yup.string()
        .required('Este campo é obrigatório')
        .min(4, 'Este campo deve conter ao menos 4 caracteres'),
      userConfirmPassword: Yup.string()
        .required('Este campo é obrigatório')
        .min(4, 'Este campo deve conter ao menos 4 caracteres')
        .oneOf([Yup.ref('userPassword')], 'As senhas devem ser iguais'),
    }),
  },
};
