import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CheckoutForm from '../components/CheckoutForm';

describe('CheckoutForm DOM validation', () => {
  it('debe mostrar errores en ambos campos cuando se hace submit vacío', async () => {
    const { container } = render(<CheckoutForm />);

    const form = container.querySelector('form');
    expect(form).not.toBeNull();

    fireEvent.submit(form);

    await new Promise(r => setTimeout(r, 80));

    const nameInput = container.querySelector('input[name="name"]');
    const emailInput = container.querySelector('input[name="email"]');

    expect(nameInput).not.toBeNull();
    expect(emailInput).not.toBeNull();

    expect(nameInput.classList.contains('is-invalid')).toBe(true);
    expect(emailInput.classList.contains('is-invalid')).toBe(true);
  });
});

