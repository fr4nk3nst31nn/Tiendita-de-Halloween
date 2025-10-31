import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShoppingCart from '../components/ShoppingCart';

describe('ShoppingCart', () => {
  it('muestra vacío en sidebar cuando no hay items', () => {
    const { container } = render(
      <MemoryRouter>
        <ShoppingCart cartItems={[]} isSidebar={true} onAddItem={() => {}} onRemoveItem={() => {}} onDeleteProduct={() => {}} onClearCart={() => {}} />
      </MemoryRouter>
    );
    expect(container.textContent).toContain('El carrito está vacío.');
  });

  it('muestra total y permite vaciar', () => {
    const items = [{ id: 1, nombre: 'Calabaza', precio: 1000, imagen: 'a.png', quantity: 2 }];
    const onClearCart = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <ShoppingCart cartItems={items} isSidebar={true} onAddItem={() => {}} onRemoveItem={() => {}} onDeleteProduct={() => {}} onClearCart={onClearCart} />
      </MemoryRouter>
    );
    expect(container.textContent).toContain('Total:');
    const btn = container.querySelector('button.btn-outline-danger');
    fireEvent.click(btn);
    expect(onClearCart).toHaveBeenCalled();
  });

  it('permite incrementar cantidad con botón +', () => {
    const items = [{ id: 1, nombre: 'Calabaza', precio: 1000, imagen: 'a.png', quantity: 1 }];
    const onAddItem = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <ShoppingCart cartItems={items} isSidebar={true} onAddItem={onAddItem} onRemoveItem={() => {}} onDeleteProduct={() => {}} onClearCart={() => {}} />
      </MemoryRouter>
    );
    const buttons = container.querySelectorAll('button');
    const plusBtn = Array.from(buttons).find(btn => btn.textContent === '+');
    fireEvent.click(plusBtn, { nativeEvent: { clientX: 100, clientY: 100 } });
    expect(onAddItem).toHaveBeenCalled();
  });

  it('permite decrementar cantidad con botón -', () => {
    const items = [{ id: 1, nombre: 'Calabaza', precio: 1000, imagen: 'a.png', quantity: 2 }];
    const onRemoveItem = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <ShoppingCart cartItems={items} isSidebar={true} onAddItem={() => {}} onRemoveItem={onRemoveItem} onDeleteProduct={() => {}} onClearCart={() => {}} />
      </MemoryRouter>
    );
    const buttons = container.querySelectorAll('button');
    const minusBtn = Array.from(buttons).find(btn => btn.textContent === '-');
    fireEvent.click(minusBtn);
    expect(onRemoveItem).toHaveBeenCalled();
  });

  it('permite eliminar producto con botón ×', () => {
    const items = [{ id: 1, nombre: 'Calabaza', precio: 1000, imagen: 'a.png', quantity: 1 }];
    const onDeleteProduct = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <ShoppingCart cartItems={items} isSidebar={true} onAddItem={() => {}} onRemoveItem={() => {}} onDeleteProduct={onDeleteProduct} onClearCart={() => {}} />
      </MemoryRouter>
    );
    const buttons = container.querySelectorAll('button');
    const deleteBtn = Array.from(buttons).find(btn => btn.textContent === '×');
    fireEvent.click(deleteBtn);
    expect(onDeleteProduct).toHaveBeenCalledWith(1);
  });
});


