import * as Yup from 'yup';
import { phoneRegex } from '../../../common/utils/validator';
import { validateCpfCnpj, validateCpf } from '../../../common/utils/cpf-cnpf';

export default {
  form: {
    initialValues: {
      userName: '',
      userCpf: '',
      userTelephone: '',
      companyName: '',
      companyCpfCnpj: '',
      companyTelephone: '',
      companyAddress: '',
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
      companyName: Yup.string().required('Este campo é obrigatório'),
      companyCpfCnpj: Yup.string()
        .required('Por favor, digite o cpf/cnpj.')
        .test('cpf-cnpj-test', 'Por favor, verifique o cpf/cnpj.', (value) =>
          validateCpfCnpj(value),
        ),
      companyTelephone: Yup.string().matches(
        phoneRegex(),
        'Por favor, verifique o número de telefone.',
      ),
      companyAddress: Yup.string(),
    }),
  },
};
