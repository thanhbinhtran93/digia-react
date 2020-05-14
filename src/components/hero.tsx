/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

export const Hero: React.FC = () => {
  return (
    <div
      css={css`
        background-color: #afb5bc;
        display: flex;
        align-items: center;
        padding: 2rem;
      `}
    >
      {/* logo here */}
      <div
        css={css`
          width: 32px;
          height: 32px;
          margin-right: 32px;
          background-color: #ffffff;
        `}
      />
      <h1
        css={css`
          color: #ffffff;
          line-height: 2rem;
        `}
      >
        Iord Software
      </h1>
    </div>
  );
};
