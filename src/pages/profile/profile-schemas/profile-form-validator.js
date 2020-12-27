import * as Yup from 'yup';

import { phoneRegex, validateCpfCnpj, validateCpf } from '../../../utils/utils';

// setValue("userName", data.name);
// setValue("userCpf", data.cpf);
// setValue("accountName", data.account.name);
// setValue("accountCpfCnpj", data.account.cpf_cnpj);
// setValue("accountTelephone", data.account.telephone);
// setValue("accountAddress", data.account.address);

export default {
    form: {
        initialValues: {
			userName: '',
			userCpf: '',
			accountName: '',
			accountCpfCnpj: '',
			accountTelephone: '',
			accountAddress: '',
        },
        validator: Yup.object({
			userName: Yup.string()
				.required('Este campo é obrigatório'),
			userCpf: Yup.string()
				.test('cpf-test', 'Por favor, verifique seu cpf.', (value) => validateCpf(value)),
			accountName: Yup.string()
				.required('Este campo é obrigatório'),
			accountCpfCnpj: Yup.string()
				.required('Por favor, digite o cpf/cnpj.')
				.test('cpf-cnpj-test', 'Por favor, verifique o cpf/cnpj.', (value) => validateCpfCnpj(value)),
			accountTelephone: Yup.string()
				.matches(phoneRegex, 'Por favor, verifique o número de telefone.'),
			accountAddress: Yup.string()
				.required('Este campo é obrigatório'),
        }),
    },
};
