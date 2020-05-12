/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface TableComposition {
  RowHeader: React.FC;
  Row: React.FC;
  Cell: React.FC;
}

export const Table: React.FC & TableComposition = ({ children, ...props }) => {
  return (
    <div
      css={css`
        width: 100%;
        background-color: #ffffff;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const rowBasecss = css`
  display: flex;
  & > * {
    flex: 1;
  }
`;

const RowHeader: React.FC = ({ children, ...props }) => {
  return (
    <div
      css={css`
        ${rowBasecss};
        color: #757575;
        font-size: 0.875rem;
        line-height: 1rem;
        font-weight: 500;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const Row: React.FC = ({ children, ...props }) => {
  return (
    <div
      css={css`
        ${rowBasecss};
        color: #505050;
        font-size: 1rem;
        line-height: 2rem;
        font-weight: 400;
        padding: 1rem;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const Cell: React.FC = ({ children, ...props }) => {
  return (
    <div
      css={css`
        display: flex;
        &:last-child {
          justify-content: flex-end;
          * + * {
            margin-left: 0.5rem;
          }
        }
      `}
      {...props}
    >
      {children}
    </div>
  );
};

Table.RowHeader = RowHeader;
Table.Row = Row;
Table.Cell = Cell;
