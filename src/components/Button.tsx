/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';

type ButtonColorType = 'primary' | 'inverted' | 'blue';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: ButtonColorType;
}

const buttonDynamicStyle = (props: ButtonProps) => {
  switch (props.color) {
    case 'primary':
      return css`
        color: #757575;
        background-color: #ededed;
      `;
    case 'inverted':
      return css`
        color: #07f;
        background-color: #ededed;
      `;
    case 'blue':
      return css`
        color: #ffffff;
        background-color: #07f;
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  ${buttonDynamicStyle};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border: none;
  outline: none;
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  color = 'primary',
  ...props
}) => {
  return (
    <StyledButton color={color} {...props}>
      {children}
    </StyledButton>
  );
};
