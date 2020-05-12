/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { useFormik } from 'formik';

import { useParticipantContext } from 'contexts/participantContext';
import { Person } from 'interfaces/Person';
import { participantSchema } from 'vadilators/participant-validator';
import styled from '@emotion/styled';
import { Table } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Input } from 'components/Input';

import { rowCellCss } from '../commonStyles';

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
            ${rowCellCss};
          `}
        >
          <Table.Cell>
            <Input
              placeholder="Full name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              placeholder="E-mail address"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
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
