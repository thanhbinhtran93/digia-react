import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ParticipantProvider } from 'contexts/participantContext';
import { ParticipantList } from 'pages/SignUp/components/ParticipantList';
import { PersonWithId } from 'interfaces/Person';

it('Should match snapshot', () => {
  const { wrapper } = setup();
  expect(wrapper).toMatchSnapshot();
});

it('Edit a row', async () => {
  const { wrapper, editBtn, deleteBtn } = setup();

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

it('Delete a row', async () => {
  const { deleteBtn } = setup();

  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  expect(screen.getByText('0441111111')).toBeInTheDocument();

  await userEvent.click(deleteBtn);

  expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  expect(screen.queryByText('john.doe@example.com')).not.toBeInTheDocument();
  expect(screen.queryByText('0441111111')).not.toBeInTheDocument();
});

it('Sort table when clicking a header', async () => {
  const { nameSortBtn } = setup();

  expect(screen.getByText('Name')).toBeInTheDocument();

  await userEvent.click(nameSortBtn);

  const sortedNames = screen.queryAllByTestId('participant-name');
  expect(sortedNames).toHaveLength(5);
  expect(sortedNames[0]).toHaveTextContent('An');
  expect(sortedNames[1]).toHaveTextContent('Binh');
  expect(sortedNames[2]).toHaveTextContent('Frank');
  expect(sortedNames[3]).toHaveTextContent('John Doe');
  expect(sortedNames[4]).toHaveTextContent('West');

  await userEvent.click(nameSortBtn);
  const sortedNamesDesc = screen.queryAllByTestId('participant-name');
  expect(sortedNamesDesc).toHaveLength(5);
  expect(sortedNamesDesc[4]).toHaveTextContent('An');
  expect(sortedNamesDesc[3]).toHaveTextContent('Binh');
  expect(sortedNamesDesc[2]).toHaveTextContent('Frank');
  expect(sortedNamesDesc[1]).toHaveTextContent('John Doe');
  expect(sortedNamesDesc[0]).toHaveTextContent('West');
});

function setup(props?: React.ComponentProps<typeof ParticipantProvider>) {
  const tree = (
    <ParticipantProvider initialState={initialState} {...props}>
      <ParticipantList />
    </ParticipantProvider>
  );
  const wrapper = render(tree);
  const editBtn = wrapper.getByTestId('edit-john-doe-id');
  const deleteBtn = wrapper.getByTestId('delete-john-doe-id');
  const nameSortBtn = wrapper.getByTestId('sortBy-name');

  return { wrapper, editBtn, deleteBtn, nameSortBtn };
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
    name: 'Binh',
    email: 'binh@example.com',
    phone: '0441111115',
  },
  {
    id: '2e987437-a4b4-46f5-b93b-ec2e2b5b15a5',
    name: 'An',
    email: 'an@example.com',
    phone: '0441111134',
  },
  {
    id: '6232da7f-b973-4ec1-bc1d-efc58b767d1c',
    name: 'Frank',
    email: 'frank@example.com',
    phone: '0441111145',
  },
  {
    id: '2a525e5d-3018-42c9-9896-9babe60dc144',
    name: 'West',
    email: 'west@example.com',
    phone: '4784651204',
  },
];
