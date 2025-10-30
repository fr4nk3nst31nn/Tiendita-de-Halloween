import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

describe('Login Form Validation Tests', () => {
  let container;

  beforeEach(() => {
    const renderResult = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    container = renderResult.container;
  });

  const submitForm = () => {
    const form = container.querySelector('form');
    fireEvent.submit(form);
  };

  it('debe prevenir submit si hay errores de validación', () => {
    submitForm();

    const spinner = container.querySelector('[data-testid="loading-spinner"]');
    expect(spinner).toBeNull();
  });
});