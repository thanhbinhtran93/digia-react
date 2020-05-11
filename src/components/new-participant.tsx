import React from 'react';
import * as Yup from 'yup';
import { v4 as id } from 'uuid';
import { useFormik } from 'formik';

import { useParticipantContext } from 'contexts/participant-context';
import { Person, PersonWithId } from 'interfaces/Person';

const getInitialForm = (): Person => {
  return {
    name: '',
    email: '',
    phone: '',
  };
};

// TODO: validate email + phone
const personSchema = Yup.object<Person>({
  name: Yup.string().required(),
  email: Yup.string().required(),
  phone: Yup.string().required(),
});

export const NewParticipant: React.FC = () => {
  const { addParticipant } = useParticipantContext();

  const formik = useFormik<Person>({
    initialValues: getInitialForm(),
    onSubmit: (values) => {
      addParticipant(values);
      formik.resetForm();
    },
    validationSchema: personSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input placeholder="Full name" name="name" value={formik.values.name} onChange={formik.handleChange} />
      <input
        placeholder="E-mail address"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <input
        placeholder="Phone number"
        type="tel"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
      />
      <button type="submit">Add new</button>
    </form>
  );
};
