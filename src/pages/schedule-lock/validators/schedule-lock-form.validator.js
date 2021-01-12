import * as Yup from 'yup';

export default {
    form: {
        initialValues: {
			id: '',
            start: '',
            end: '',
            date: null,
        },
        validator: Yup.object({
            start: Yup.string().required('Este campo é obrigatório'),
            end: Yup.string().required('Este campo é obrigatório'),
            date: Yup.string().required('Este campo é obrigatório'),
        }),
    },
};
