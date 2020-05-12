/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface InputHtmlProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input: React.FC<InputHtmlProps> = (props) => {
  return (
    <input
      css={css`
        padding: 0.5rem 1rem;
        width: 100%;
        margin-right: 1rem;
        background-color: #fafafa;
        border: 1px solid #eeeeee;
        font-size: 1rem;
      `}
      {...props}
    />
  );
};
