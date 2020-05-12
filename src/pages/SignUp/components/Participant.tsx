/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { PersonWithId } from 'interfaces/Person';
import styled from '@emotion/styled';
import { useParticipantContext } from 'contexts/participantContext';
import { useFormik } from 'formik';
import { participantSchema } from 'vadilators/participant-validator';
import { Button } from '../../../components/Button';
import { Table } from '../../../components/Table';
import { rowCellCss } from '../commonStyles';
import { Input } from 'components/Input';
import { EditIcon, DeleteIcon } from 'components/Icons';

const IconButton = styled.button`
  border: none;
  background: none;
  outline: none;
  padding: 0 0.5rem;
  height: 1.5rem;
  cursor: pointer;
  & > svg {
    fill: #909090;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

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

  return (
    <Table.Row
      key={participant.id}
      css={css`
        border-bottom: 1px solid #f5f5f5;
        padding: 1.5rem;
        line-height: 1.5rem;
        font-weight: 400;
        ${rowCellCss};
      `}
    >
      <Table.Cell>{participant.name}</Table.Cell>
      <Table.Cell>{participant.email}</Table.Cell>
      <Table.Cell>{participant.phone}</Table.Cell>
      <Table.Cell>
        <IconButton onClick={onToggleEditing}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleRemove}>
          <DeleteIcon />
        </IconButton>
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
          border-bottom: 1px solid #f5f5f5;
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
