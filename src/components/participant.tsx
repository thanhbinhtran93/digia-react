import React from 'react';
import * as Yup from 'yup';
import { PersonWithId } from 'interfaces/Person';
import styled from '@emotion/styled';
import { useParticipantContext } from 'contexts/participant-context';
import { useFormik } from 'formik';

interface ParticipantProps {
  participant: PersonWithId;
}

const Wrapper = styled('div')`
  display: flex;
  border-bottom: 1px solid black;
  padding: 24px;
  justify-content: space-between;
  & > * {
    line-height: 24px;
    font-weight: 400;
  }
`;

export const Participant: React.FC<ParticipantProps> = ({ participant }) => {
  const [isEditing, setEditing] = React.useState<boolean>(false);

  const toggleEditing = () => setEditing((prev) => !prev);

  const resolveContent = () => {
    if (isEditing) return <EditParticipant participant={participant} onToggleEditing={toggleEditing} />;
    return <DisplayParticipant participant={participant} onToggleEditing={toggleEditing} />;
  };

  return <Wrapper>{resolveContent()}</Wrapper>;
};

interface DisplayParticipantProps extends ParticipantProps {
  onToggleEditing: () => void;
}

const DisplayParticipant: React.FC<DisplayParticipantProps> = ({ participant, onToggleEditing }) => {
  const { removeParticipant } = useParticipantContext();
  const handleRemove = () => {
    removeParticipant(participant.id);
  };
  return (
    <>
      <div>{participant.name}</div>
      <div>{participant.email}</div>
      <div>{participant.phone}</div>
      <div>
        <button onClick={onToggleEditing}>edit</button>
        <button onClick={handleRemove}>delete</button>
      </div>
    </>
  );
};

const personSchema = Yup.object<PersonWithId>({
  id: Yup.string().required(),
  name: Yup.string().required(),
  email: Yup.string().required(),
  phone: Yup.string().required(),
});

interface EditParticipantProps extends ParticipantProps {
  onToggleEditing: () => void;
}

const EditParticipant: React.FC<EditParticipantProps> = ({ participant, onToggleEditing }) => {
  const { editParticipant } = useParticipantContext();

  const formik = useFormik<PersonWithId>({
    initialValues: participant,
    onSubmit: (values) => {
      editParticipant(values);
      onToggleEditing();
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
      <button onClick={onToggleEditing}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  );
};
