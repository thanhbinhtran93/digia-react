import React from 'react';

export const EditIcon: React.FC = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      height="48"
      width="48"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Edit icon</title>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
      <path fill="none" d="M0 0h24v24H0z"></path>
    </svg>
  );
};

export const DeleteIcon: React.FC = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      height="48"
      width="48"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Delete icon</title>
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
      <path fill="none" d="M0 0h24v24H0z"></path>
    </svg>
  );
};
