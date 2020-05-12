import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ParticipantProvider } from 'contexts/participantContext';
import { NewParticipant } from 'pages/SignUp/components/NewParticipant';
import { ParticipantList } from 'pages/SignUp/components/ParticipantList';
import { PersonWithId } from 'interfaces/Person';

it('Edit a row', async () => {
  const { wrapper, editBtn, deleteBtn } = setup();
  expect(wrapper).toMatchSnapshot();

  await userEvent.click(editBtn);
  const saveBtn = wrapper.getByText(/save/i);
  const nameInput = wrapper.getByDisplayValue(/john doe/i);
  const emailInput = wrapper.getByDisplayValue(/john.doe@example.com/i);
  const phoneInput = wrapper.getByDisplayValue(/0441111111/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  expect(saveBtn).toBeInTheDocument();
  expect(editBtn).not.toBeInTheDocument();
  expect(deleteBtn).not.toBeInTheDocument();

  await userEvent.type(nameInput, 'new name');
  await userEvent.click(saveBtn);

  await waitFor(() => {
    expect(screen.getByText('John Doenew name')).toBeInTheDocument();
    expect(screen.getByText('0441111111')).toBeInTheDocument();
  });
});

function setup(props?: React.ComponentProps<typeof ParticipantProvider>) {
  const tree = (
    <ParticipantProvider initialState={initialState} {...props}>
      <NewParticipant />
      <ParticipantList />
    </ParticipantProvider>
  );
  const wrapper = render(tree);
  const editBtn = wrapper.getByTestId('edit-john-doe-id');
  const deleteBtn = wrapper.getByTestId('delete-john-doe-id');

  return { wrapper, editBtn, deleteBtn };
}

const initialState: PersonWithId[] = [
  {
    id: 'john-doe-id',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '0441111111',
  },
  {
    id: 'e732f945-3eed-42d0-9b77-381c232a98dc',
    name: 'Kaycee Cimah',
    email: 'kaycee.cimah@example.com',
    phone: '8468361594',
  },
  {
    id: '2e987437-a4b4-46f5-b93b-ec2e2b5b15a5',
    name: 'Jemimah McLain',
    email: 'jemimah.mclain@example.com',
    phone: '8738048768',
  },
  {
    id: '6232da7f-b973-4ec1-bc1d-efc58b767d1c',
    name: 'Frank Queridas',
    email: 'frank.queridas@example.com',
    phone: '6086265451',
  },
  {
    id: '2a525e5d-3018-42c9-9896-9babe60dc144',
    name: 'Filide Loring',
    email: 'filide.loring@example.com',
    phone: '4784651204',
  },
];
