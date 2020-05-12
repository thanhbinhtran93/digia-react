/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { SEO } from 'components/SEO';
import { ParticipantProvider } from 'contexts/participantContext';
import { NewParticipant } from './components/NewParticipant';
import { ParticipantList } from './components/ParticipantList';

export const SignUp: React.FC = () => {
  return (
    <React.Fragment>
      <SEO />
      <h1
        css={css`
          margin-bottom: 2rem;
        `}
      >
        List of participants
      </h1>
      <ParticipantProvider>
        <NewParticipant
          css={css`
            margin-bottom: 0.5rem;
          `}
        />
        <ParticipantList />
      </ParticipantProvider>
    </React.Fragment>
  );
};
