import * as Yup from 'yup';
import { phoneRegex, validateCpfCnpj } from '../../utils/utils';

export default {
    form: {
        initialValues: {
            name: '',
            email: '',
            account: '',
            telephone: '',
            cpfCnpj: '',
            password: '',
            confirmPassword: '',
        },
        validator: Yup.object({
            name: Yup.string().required('Este campo é obrigatório'),
            email: Yup.string()
				.required('Por favor, digite seu email.')
				.email('Por favor, digite um email válido.'),
			account: Yup.string().required('Este campo é obrigatório'),
			telephone: Yup.string()
				.required('Por favor, digite seu telefone.')
				.matches(
					phoneRegex,
					'Por favor, verifique seu número de telefone.'
				),
			cpfCnpj: Yup.string()
				.required('Por favor, digite seu cpf/cnpj.')
				.test('cpf-cnpj-test', 'Por favor, verifique seu cpf/cnpj.', (value) => validateCpfCnpj(value)),
            password: Yup.string()
                .required('Este campo é obrigatório')
                .min(4, 'Este campo deve conter ao menos 4 caracteres'),
            confirmPassword: Yup.string()
                .required('Este campo é obrigatório')
                .min(4, 'Este campo deve conter ao menos 4 caracteres')
                .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
        }),
    },
};
