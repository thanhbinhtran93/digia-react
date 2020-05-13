/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface InputHtmlProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: boolean | string;
}

export const Input: React.FC<InputHtmlProps> = ({ error = false, ...props }) => {
  return (
    <input
      css={css`
        padding: 0.5rem 1rem;
        width: 100%;
        background-color: #fafafa;
        font-size: 1rem;
        border: ${error ? '2px solid #f44336' : '1px solid #eeeeee'};
      `}
      {...props}
    />
  );
};
