import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Logo Tests', () => {
  it('debe renderizar el título de marca en el header', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const brand = container.querySelector('.navbar-brand');
    expect(brand).not.toBeNull();
    expect(brand.textContent).toContain('TIENDA LA CRIPTA');
  });
});