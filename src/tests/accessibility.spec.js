import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

describe('Login Form Accessibility Tests', () => {
  it('debe tener labels asociados a inputs', () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = container.querySelector('[data-testid="email-input"]');
    const passwordInput = container.querySelector('[data-testid="password-input"]');

    expect(emailInput.getAttribute('id')).toBe('email');
    expect(passwordInput.getAttribute('id')).toBe('password');

    const emailLabel = container.querySelector('label[for="email"]');
    const passwordLabel = container.querySelector('label[for="password"]');

    expect(emailLabel).toBeDefined();
    expect(passwordLabel).toBeDefined();
    expect(emailLabel.textContent).toContain('Correo electrónico');
    expect(passwordLabel.textContent).toContain('Contraseña');
  });
});