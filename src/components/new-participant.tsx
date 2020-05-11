import React from 'react';
import { useFormik } from 'formik';

import { useParticipantContext } from 'contexts/participant-context';
import { Person, PersonWithId } from 'interfaces/Person';
import { participantSchema } from 'vadilators/participant-validator';

const getInitialForm = (): Person => {
  return {
    name: '',
    email: '',
    phone: '',
  };
};

export const NewParticipant: React.FC = () => {
  const { addParticipant } = useParticipantContext();

  const formik = useFormik<Person>({
    initialValues: getInitialForm(),
    onSubmit: (values, helpers) => {
      addParticipant(values);
      helpers.resetForm();
    },
    validationSchema: participantSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {JSON.stringify(formik.errors, null, 2)}
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
