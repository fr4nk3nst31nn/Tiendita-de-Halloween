import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

describe('Login async flow (loading -> success -> cleanup)', () => {
  it('debe mostrar success después de 2 segundos y luego limpiar formulario', async () => {
    const { container } = render(<Login />);

    const emailInput = container.querySelector('[data-testid="email-input"]');
    const passwordInput = container.querySelector('[data-testid="password-input"]');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const form = container.querySelector('.login-form');
    expect(form).not.toBeNull();
    fireEvent.submit(form);

    await sleep(2100);

    let spinner = container.querySelector('[data-testid="loading-spinner"]');
    expect(spinner).toBeNull();

    let success = container.querySelector('[data-testid="success-message"]');
    expect(success).not.toBeNull();
    expect(success.textContent).toContain('¡Inicio de sesión exitoso!');

    await sleep(2100);

    success = container.querySelector('[data-testid="success-message"]');
    expect(success).toBeNull();

    const newEmailInput = container.querySelector('[data-testid="email-input"]');
    const newPasswordInput = container.querySelector('[data-testid="password-input"]');
    expect(newEmailInput.value).toBe('');
    expect(newPasswordInput.value).toBe('');
  }, 10000);
});
