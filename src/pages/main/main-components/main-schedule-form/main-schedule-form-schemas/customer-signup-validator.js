import * as Yup from 'yup';
import { phoneRegex } from '../../../../../utils/utils';

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
            telephone: Yup.string()
                .required('Por favor, digite seu telefone.')
                .matches(
                    phoneRegex,
                    'Por favor, verifique seu número de telefone.'
                ),
            password: Yup.string()
                .required('Este campo é obrigatório')
                .min(4, 'Este campo deve conter ao menos 4 caracteres'),
            confirmPassword: Yup.string()
                .required('Este campo é obrigatório')
                .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
        }),
    },
};
