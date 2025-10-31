import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

it('debe mostrar error con email sin @', () => {
  const { container, getByTestId } = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = getByTestId('email-input');
  fireEvent.change(emailInput, { target: { value: 'testemail.com' } });

  const form = container.querySelector('form');
  fireEvent.submit(form);

  const error = getByTestId('email-error');
  expect(error.textContent).toBe('El formato del correo electrónico no es válido');
});