import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CheckoutPage from '../components/CheckoutPage';

it('renderiza CheckoutPage con el título y ShoppingCart', () => {
  const items = [{ id: 1, nombre: 'Calabaza', precio: 1000, imagen: 'a.png', quantity: 1 }];
  const { container } = render(
    <MemoryRouter>
      <CheckoutPage
        cartItems={items}
        onAddItem={() => {}}
        onRemoveItem={() => {}}
        onDeleteProduct={() => {}}
        onClearCart={() => {}}
      />
    </MemoryRouter>
  );
  expect(container.textContent).toContain('Finalizar Hechizo');
  expect(container.textContent).toContain('Calabaza');
});

