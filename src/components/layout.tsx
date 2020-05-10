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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-size: 18px;
    line-height: 1.4;
  }
  h1 {
    margin: 0;
  }
`;

const Main = styled('main')`
  margin: 2rem auto;
  max-width: 912px;
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Main>{children}</Main>
    </>
  );
};