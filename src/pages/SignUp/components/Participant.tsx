/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { PersonWithId } from 'interfaces/Person';
import styled from '@emotion/styled';
import { useParticipantContext } from 'contexts/participantContext';
import { useFormik } from 'formik';
import { participantSchema } from 'vadilators/participant-validator';
import { Button } from '../../../components/Button';
import { Table } from '../../../components/data-table';

interface ParticipantProps {
  participant: PersonWithId;
}

export const Participant: React.FC<ParticipantProps> = ({ participant }) => {
  const [isEditing, setEditing] = React.useState<boolean>(false);

  const toggleEditing = () => setEditing((prev) => !prev);

  if (isEditing) {
    return (
      <EditParticipant
        participant={participant}
        onToggleEditing={toggleEditing}
      />
    );
  }
  return (
    <DisplayParticipant
      participant={participant}
      onToggleEditing={toggleEditing}
    />
  );
};

interface DisplayParticipantProps extends ParticipantProps {
  onToggleEditing: () => void;
}

const DisplayParticipant: React.FC<DisplayParticipantProps> = ({
  participant,
  onToggleEditing,
}) => {
  const { removeParticipant } = useParticipantContext();
  const handleRemove = () => {
    removeParticipant(participant.id);
  };
  const childCss = css`
    & > :first-of-type {
      flex: 1 1 20%;
    }
    & > :nth-of-type(2) {
      flex: 1 1 35%;
    }
    & > :nth-of-type(3) {
      flex: 1 1 25%;
    }
    & > :last-of-type {
      flex: 1 1 20%;
    }
  `;
  return (
    <Table.Row
      key={participant.id}
      css={css`
        border-bottom: 1px solid #f5f5f5;
        padding: 1.5rem;
        line-height: 1.5rem;
        font-weight: 400;
        ${childCss};
      `}
    >
      <Table.Cell>{participant.name}</Table.Cell>
      <Table.Cell>{participant.email}</Table.Cell>
      <Table.Cell>{participant.phone}</Table.Cell>
      <Table.Cell>
        <button onClick={onToggleEditing}>edit</button>
        <button onClick={handleRemove}>delete</button>
      </Table.Cell>
    </Table.Row>
  );
};

const Form = styled('form')`
  width: 100%;
`;
interface EditParticipantProps extends ParticipantProps {
  onToggleEditing: () => void;
}

const EditParticipant: React.FC<EditParticipantProps> = ({
  participant,
  onToggleEditing,
  ...props
}) => {
  const { editParticipant } = useParticipantContext();

  const formik = useFormik<PersonWithId>({
    initialValues: participant,
    onSubmit: (values) => {
      editParticipant(values);
      onToggleEditing();
    },
    validationSchema: participantSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit} {...props}>
      {/**TODO: show error */}
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
          <Button color="inverted" onClick={onToggleEditing}>
            Cancel
          </Button>
          <Button color="blue" type="submit">
            Save
          </Button>
        </Table.Cell>
      </Table.Row>
    </Form>
  );
};
{
  /* <form onSubmit={formik.handleSubmit}>
      
      <input
        placeholder="Full name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
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
     
    </form>
 */
}
