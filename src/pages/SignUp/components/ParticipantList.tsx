/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { useParticipantContext } from 'contexts/participantContext';
import { PersonWithId } from 'interfaces/Person';
import { ArrowIcon } from '../../../components/ArrowIcon';
import { useSortableData } from 'hooks/useSortableData';
import { Table } from '../../../components/Table';
import { Participant } from './Participant';
import { rowCellCss } from '../commonStyles';

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
    label: 'Phone number',
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
          ${rowCellCss};
        `}
      >
        {headers.map((item) => (
          <Table.Cell key={item.key}>
            <span
              onClick={() => sort(item.key)}
              css={css`
                cursor: pointer;
                display: flex;
                align-items: center;
                & > svg {
                  height: 1rem;
                }
              `}
            >
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
