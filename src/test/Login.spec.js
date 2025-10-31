import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

describe('Login flow console.log spy', () => {
  it('debe llamar console.log con los datos correctos durante el login', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const phoneInput = getByTestId('phone-input');
    const rutInput = getByTestId('rut-input');

    const testEmail = 'spy@test.com';
    const testPassword = 'secret123';
    const testPhone = '(2) 2123 4567';
    const testRut = '12345678-5';

    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.change(passwordInput, { target: { value: testPassword } });
    fireEvent.change(phoneInput, { target: { value: testPhone } });
    fireEvent.change(rutInput, { target: { value: testRut } });

    const form = emailInput.closest('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form);

    await sleep(2100);

    expect(console.log).toHaveBeenCalledWith('Login exitoso:', {
      email: testEmail,
      password: testPassword,
      phone: testPhone,
      rut: testRut,
    });
  }, 10000);
});
