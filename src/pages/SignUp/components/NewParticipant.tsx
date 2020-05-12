/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { useFormik } from 'formik';

import { useParticipantContext } from 'contexts/participantContext';
import { Person } from 'interfaces/Person';
import { participantSchema } from 'vadilators/participant-validator';
import styled from '@emotion/styled';
import { Table } from '../../../components/data-table';
import { Button } from '../../../components/Button';

const getInitialForm = (): Person => {
  return {
    name: '',
    email: '',
    phone: '',
  };
};

const Form = styled('form')`
  width: 100%;
`;

export const NewParticipant: React.FC = (props) => {
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
    <Form onSubmit={formik.handleSubmit} {...props}>
      {/**TODO: show error */}
      <Table>
        <Table.Row
          css={css`
            padding: 1rem;
          `}
        >
          <Table.Cell>
            <input
              placeholder="Full name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Table.Cell>
          <Table.Cell>
            <input
              placeholder="E-mail address"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Table.Cell>
          <Table.Cell>
            <input
              placeholder="Phone number"
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </Table.Cell>
          <Table.Cell>
            <Button type="submit">Add new</Button>
          </Table.Cell>
        </Table.Row>
      </Table>
    </Form>
  );
};
