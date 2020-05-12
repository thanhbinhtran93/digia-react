import { css } from '@emotion/core';

export const rowCellCss = css`
  & > :first-of-type {
    flex: 1 1 20%;
  }
  & > :nth-of-type(2) {
    flex: 1 1 35%;
  }
  & > :nth-of-type(3) {
    flex: 1 1 24%;
  }
  & > :last-of-type {
    flex: 1 1 21%;
  }
`;
