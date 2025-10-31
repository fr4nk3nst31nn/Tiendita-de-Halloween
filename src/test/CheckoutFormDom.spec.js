import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

describe('CheckoutForm DOM interactions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('maneja cambios en los inputs del formulario', () => {
    const { container } = render(
      <MemoryRouter>
        <CheckoutForm />
      </MemoryRouter>
    );
    
    const nameInput = container.querySelector('input[name="name"]');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    expect(nameInput.value).toBe('Test User');
  });

  it('envía el formulario exitosamente', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Éxito' }),
    });

    const { container } = render(
      <MemoryRouter>
        <CheckoutForm />
      </MemoryRouter>
    );

    fireEvent.change(container.querySelector('input[name="name"]'), { target: { value: 'Test User' } });
    fireEvent.change(container.querySelector('input[name="email"]'), { target: { value: 'test@test.com' } });
    fireEvent.change(container.querySelector('textarea[name="address"]'), { target: { value: 'Calle Larga 123, Ciudad' } });
    fireEvent.change(container.querySelector('input[name="phone"]'), { target: { value: '(2) 2123 4567' } });
    fireEvent.change(container.querySelector('input[name="rut"]'), { target: { value: '12345678-5' } });
    fireEvent.change(container.querySelector('select[name="paymentMethod"]'), { target: { value: 'card' } });

    const submitButton = container.querySelector('[data-testid="submit-button"]');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/api/send-email', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }));
    });
  });

  it('maneja errores del servidor', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const { container } = render(
      <MemoryRouter>
        <CheckoutForm />
      </MemoryRouter>
    );

    fireEvent.change(container.querySelector('input[name="name"]'), { target: { value: 'Test User' } });
    fireEvent.change(container.querySelector('input[name="email"]'), { target: { value: 'test@test.com' } });
    fireEvent.change(container.querySelector('textarea[name="address"]'), { target: { value: 'Calle Larga 123, Ciudad' } });
    fireEvent.change(container.querySelector('input[name="phone"]'), { target: { value: '(2) 2123 4567' } });
    fireEvent.change(container.querySelector('input[name="rut"]'), { target: { value: '12345678-5' } });
    fireEvent.change(container.querySelector('select[name="paymentMethod"]'), { target: { value: 'card' } });

    const submitButton = container.querySelector('[data-testid="submit-button"]');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
