import * as Yup from 'yup';

export default {
    form: {
        initialValues: {
            email: '',
        },
        validator: Yup.object({
			email: Yup.string()
				.email('Insira um e-mail válido')
				.required('Este campo é obrigatório'),
        }),
    },
};
