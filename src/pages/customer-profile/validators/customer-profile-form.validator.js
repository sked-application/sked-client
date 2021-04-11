import * as Yup from 'yup';
import { phoneRegex } from '../../../common/utils/validator';
import { validateCpf } from '../../../common/utils/cpf-cnpf';

export default {
  form: {
    initialValues: {
      userName: '',
      userCpf: '',
      userTelephone: '',
    },
    validator: Yup.object({
      userName: Yup.string().required('Este campo é obrigatório'),
      userCpf: Yup.string().test(
        'cpf-test',
        'Por favor, verifique seu cpf.',
        (value) => {
          if (value) {
            return validateCpf(value);
          }

          return true;
        },
      ),
      userTelephone: Yup.string().test(
        'user-telephone',
        'Por favor, verifique o número de telefone.',
        (value) => {
          if (value) {
            return phoneRegex().test(value);
          }

          return true;
        },
      ),
    }),
  },
};
