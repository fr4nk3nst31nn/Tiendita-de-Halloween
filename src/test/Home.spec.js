import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Home from '../components/Home';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

it('renderiza el título principal de Home', () => {
  useNavigate.mockReturnValue(jest.fn());
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(container.textContent).toContain('Bienvenidos a la Tienda Maldita de Halloween');
});

it('navega a /productos al hacer click en imagen del carousel', () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);
  
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const images = container.querySelectorAll('img[style*="cursor: pointer"]');
  expect(images.length).toBeGreaterThan(0);
  fireEvent.click(images[0]);
  expect(mockNavigate).toHaveBeenCalledWith('/productos');
});


