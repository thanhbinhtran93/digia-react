/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { useParticipantContext } from 'contexts/participantContext';
import { PersonWithId } from 'interfaces/Person';
import { ArrowIcon } from '../../../components/ArrowIcon';
import { useSortableData } from 'hooks/useSortableData';
import { Table } from '../../../components/data-table';
import { Participant } from './Participant';

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
  const { items, sort, sortConfig } = useSortableData<PersonWithId>(
    participants,
  );

  return (
    <Table>
      <Table.RowHeader
        css={css`
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f5f5f5;
        `}
      >
        {headers.map((item) => (
          <Table.Cell key={item.key}>
            <span onClick={() => sort(item.key)}>
              {item.label}
              {sortConfig?.key === item.key ? (
                <ArrowIcon direction={sortConfig.direction} />
              ) : null}
            </span>
          </Table.Cell>
        ))}
        <Table.Cell />
      </Table.RowHeader>

      {items.map((participant) => (
        <Participant key={participant.id} participant={participant} />
      ))}
    </Table>
  );
};
{
  /* <div>
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
    </div> */
}
