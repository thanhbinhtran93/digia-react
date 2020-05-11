/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { useParticipantContext } from 'contexts/participant-context';
import { Participant } from './participant';
import { PersonWithId } from 'interfaces/Person';
import { ArrowIcon } from './arrow-icon';
import { useSortableData } from 'hooks/useSortableData';

interface Header {
  key: keyof PersonWithId;
  label: string;
}
const headers: Header[] = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'E-mail address',
  },
  {
    key: 'phone',
    label: 'Phone',
  },
];

export const ParticipantList: React.FC = () => {
  const { participants } = useParticipantContext();
  const { items, sort, sortConfig } = useSortableData<PersonWithId>(participants);

  return (
    <div>
      <div
        css={css`
          display: flex;
          border-bottom: 1px solid black;
          padding: 24px;
          justify-content: space-between;
          & > * {
            line-height: 24px;
            font-weight: 400;
            flex: 1;
          }
        `}
      >
        {headers.map((item) => (
          <div key={item.key} onClick={() => sort(item.key)}>
            <span>
              {item.label}
              {sortConfig?.key === item.key ? <ArrowIcon direction={sortConfig.direction} /> : null}
            </span>
          </div>
        ))}
        <div></div>
      </div>
      {items.map((participant) => (
        <Participant key={participant.id} participant={participant} />
      ))}
    </div>
  );
};
