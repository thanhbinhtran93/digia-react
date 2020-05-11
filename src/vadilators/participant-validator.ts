import * as Yup from 'yup';
import { Person } from 'interfaces/Person';

export const participantSchema = Yup.object<Person>({
  name: Yup.string().required(),
  email: Yup.string().required(),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone has to be 10 digits')
    .required(),
});
