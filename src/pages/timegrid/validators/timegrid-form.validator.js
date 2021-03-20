import * as Yup from 'yup';

export default {
  form: {
    initialValues: {
      start: '',
      end: '',
    },
    validator: Yup.object({
      start: Yup.string().required(),
      end: Yup.string().required(),
    }),
  },
};
