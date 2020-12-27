import * as Yup from 'yup';
import { phoneRegex, validateCpfCnpj } from '../../utils/utils';

export default {
    form: {
        initialValues: {
            accountUrl: '',
            accountName: '',
            accountCpfCnpj: '',
            accountTelephone: '',
            userName: '',
            userEmail: '',
            userPassword: '',
            userConfirmPassword: '',
        },
        validator: Yup.object({
			accountUrl: Yup.string().required('Este campo é obrigatório'),
			accountName: Yup.string().required('Este campo é obrigatório'),
			accountCpfCnpj: Yup.string()
				.required('Por favor, digite seu cpf/cnpj.')
				.test('cpf-test', 'Por favor, verifique seu cpf/cnpj.', (value) => validateCpfCnpj(value)),
			accountTelephone: Yup.string()
				.required('Por favor, digite seu telefone.')
				.matches(
					phoneRegex,
					'Por favor, verifique seu número de telefone.'
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
