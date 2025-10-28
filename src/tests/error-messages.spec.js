import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

describe('Error Message Tests', () => {
  let container;

  beforeEach(() => {
    const renderResult = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    container = renderResult.container;
  });

  it('debe mostrar mensajes de error específicos para cada campo', () => {
    const form = container.querySelector('form');
    fireEvent.submit(form);

    const emailError = container.querySelector('[data-testid="email-error"]');
    expect(emailError).not.toBeNull();
    expect(emailError.textContent).toBe('El correo electrónico es requerido');

    const passwordError = container.querySelector('[data-testid="password-error"]');
    expect(passwordError).not.toBeNull();
    expect(passwordError.textContent).toBe('La contraseña es requerida');

    const emailInput = container.querySelector('[data-testid="email-input"]');
    fireEvent.change(emailInput, { target: { value: 'correo-invalido' } });
    fireEvent.submit(form);

    expect(emailError.textContent).toBe('El formato del correo electrónico no es válido');
  });
});