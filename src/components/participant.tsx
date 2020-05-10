import React from 'react';
import { PersonWithId } from 'interfaces/Person';
import styled from '@emotion/styled';
import { useParticipantContext } from 'contexts/participant-context';

interface ParticipantProps {
  participant: PersonWithId;
}

const Wrapper = styled('div')`
  display: flex;
  border-bottom: 1px solid black;
  padding: 24px;
  & > * {
    line-height: 24px;
    font-weight: 400;
  }
`;

type Mode = 'displaying' | 'editing';

export const Participant: React.FC<ParticipantProps> = ({ participant }) => {
  const [mode, setMode] = React.useState<Mode>('displaying');

  const { removeParticipant } = useParticipantContext();
  const handleRemove = () => {
    removeParticipant(participant.id);
  };
  return (
    <Wrapper>
      <div>{participant.name}</div>
      <div>{participant.email}</div>
      <div>{participant.phone}</div>
      <div>
        <button>edit</button>
        <button onClick={handleRemove}>delete</button>
      </div>
    </Wrapper>
  );
};
