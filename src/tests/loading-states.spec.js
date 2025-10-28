import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

describe('Loading State Tests', () => {
  let container;

  beforeEach(() => {
    const renderResult = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    container = renderResult.container;
  });

  it('debe mostrar y ocultar el spinner durante el proceso de login', async () => {
    const emailInput = container.querySelector('[data-testid="email-input"]');
    const passwordInput = container.querySelector('[data-testid="password-input"]');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const form = container.querySelector('form');
    await act(async () => {
      fireEvent.submit(form);
    });

    const spinner = container.querySelector('[data-testid="loading-spinner"]');
    expect(spinner).not.toBeNull();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    const spinnerAfter = container.querySelector('[data-testid="loading-spinner"]');
    expect(spinnerAfter).toBeNull();
  });

  it('debe deshabilitar el botón de submit durante el proceso', async () => {
    const submitButton = container.querySelector('[data-testid="submit-button"]');
    
    expect(submitButton.disabled).toBe(false);

    const emailInput = container.querySelector('[data-testid="email-input"]');
    const passwordInput = container.querySelector('[data-testid="password-input"]');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.submit(container.querySelector('form'));
    });

    expect(submitButton.disabled).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
    
    expect(submitButton.disabled).toBe(false);
  });
});