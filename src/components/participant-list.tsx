import React from 'react';
import { useParticipantContext } from 'contexts/participant-context';
import { Participant } from './participant';

export const ParticipantList = () => {
  const { participants } = useParticipantContext();

  return (
    <div>
      {participants.map((participant) => (
        <Participant key={participant.id} participant={participant} />
      ))}
    </div>
  );
};
