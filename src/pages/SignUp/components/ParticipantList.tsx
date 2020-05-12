/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

import { useParticipantContext } from 'contexts/participantContext';
import { PersonWithId } from 'interfaces/Person';
import { ArrowIcon } from 'components/ArrowIcon';
import { Table } from 'components/Table';
import { useSortableData } from 'hooks/useSortableData';
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
  const { items, sort, currentSortedKey, isSortedDesc } = useSortableData<
    PersonWithId
  >(participants);

  return (
    <Table>
      <Table.RowHeader
        css={css`
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f5f5f5;
          ${rowCellCss};
        `}
      >
        {headers.map((header) => (
          <Table.Cell key={header.key}>
            <span
              onClick={() => sort({ sortedKey: header.key })}
              css={css`
                cursor: pointer;
                display: flex;
                align-items: center;
                & > svg {
                  height: 1rem;
                }
              `}
            >
              {header.label}
              {currentSortedKey === header.key ? (
                <ArrowIcon direction={isSortedDesc ? 'desc' : 'asc'} />
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
