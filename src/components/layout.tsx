import React from 'react';
import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    margin: 0;
    color: #555;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 16px;
    line-height: 1.4;
    background-color: #f5f5f5;
  }
  h1 {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1.5rem;
  }
`;

const Main = styled('main')`
  margin: 2rem auto;
  max-width: 61rem;
  padding: 2rem;
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Main>{children}</Main>
    </>
  );
};
