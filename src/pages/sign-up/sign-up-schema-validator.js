import * as Yup from 'yup';

export default {
    form: {
        initialValues: {
            name: '',
            account: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validator: Yup.object({
            name: Yup.string().required('Este campo é obrigatório'),
            account: Yup.string().required('Este campo é obrigatório'),
            email: Yup.string().email('Digite um e-mail válido').required('Este campo é obrigatório'),
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
