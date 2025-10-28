import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../components/Header';

describe('Logo Tests', () => {
  it('debe renderizar el logo "MyApp"', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logo = container.querySelector('.logo');

    expect(logo).not.toBeNull();

    expect(logo.textContent).toBe('MyApp');
  });
});