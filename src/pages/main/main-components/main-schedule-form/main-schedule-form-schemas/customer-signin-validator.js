import * as Yup from 'yup';

export default {
    form: {
        initialValues: {
            email: '',
            password: '',
        },
        validator: Yup.object({
            email: Yup.string()
                .required('Por favor, digite seu email.')
                .email('Por favor, digite um email válido.'),
            password: Yup.string().required('Este campo é obrigatório'),
        }),
    },
};
