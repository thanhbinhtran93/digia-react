import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SignUp } from '../SignUp';

it('Add new row', async () => {
  const { nameInput, emailInput, phoneInput, addBtn } = setup();

  await userEvent.type(nameInput, 'new name');
  await userEvent.type(emailInput, 'nemail@email.com');
  await userEvent.type(phoneInput, '1234567890');
  await userEvent.click(addBtn);

  await waitFor(() => {
    expect(screen.getByText('new name')).toBeInTheDocument();
    expect(screen.getByText('nemail@email.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
  });
});

function setup(props?: React.ComponentProps<typeof SignUp>) {
  const wrapper = render(<SignUp {...props} />);
  const nameInput = wrapper.getByPlaceholderText(/full name/i);
  const emailInput = wrapper.getByPlaceholderText(/e-mail address/i);
  const phoneInput = wrapper.getByPlaceholderText(/phone number/i);
  const addBtn = wrapper.getByText(/add new/i);
  return { wrapper, nameInput, emailInput, phoneInput, addBtn };
}
