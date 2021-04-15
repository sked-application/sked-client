import * as Yup from 'yup';
import { phoneRegex } from '../../../common/utils/validator';

export default {
  form: {
    initialValues: {
      userName: '',
      userTelephone: '',
    },
    validator: Yup.object({
      userName: Yup.string().required('Este campo é obrigatório'),
      userTelephone: Yup.string().test(
        'user-telephone',
        'Por favor, verifique o número de telefone.',
        (value) => {
          if (value) {
            return phoneRegex(value);
          }

          return true;
        },
      ),
    }),
  },
};
