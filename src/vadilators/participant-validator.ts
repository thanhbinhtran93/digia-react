import * as Yup from 'yup';
import { Person } from 'interfaces/Person';

export const participantSchema = Yup.object<Person>({
  name: Yup.string().required(),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email')
    .required(),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone has to be 10 digits')
    .required(),
});
