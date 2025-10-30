import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductCard, { formatPrice } from '../components/ProductCard';

describe('ProductCard Component', () => {
  let container, root;
  const mockProduct = { id: 101, nombre: 'Calabaza Mágica', precio: 5000, imagen: 'pumpkin.png' };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    root.unmount();
    document.body.removeChild(container);
  });

  it('debe mostrar el nombre y precio del producto', (done) => {
    const mockAddItem = jest.fn();
    root.render(<ProductCard product={mockProduct} onAddItem={mockAddItem} />);
    setTimeout(() => {
      expect(container.textContent).toContain('Calabaza Mágica');
      expect(container.textContent).toContain('$5.000');
      done();
    }, 100);
  });
  
  it('debe llamar a la función onAddItem al hacer clic en "Añadir"', (done) => {
    const mockAddItem = jest.fn();
    root.render(<ProductCard product={mockProduct} onAddItem={mockAddItem} />);
    setTimeout(() => {
      container.querySelector(`[data-testid="add-to-cart-${mockProduct.id}"]`).click();
      expect(mockAddItem).toHaveBeenCalled();
      const [firstArg] = mockAddItem.mock.calls[0];
      expect(firstArg).toEqual(mockProduct);
      expect(mockAddItem).toHaveBeenCalledTimes(1);
      done();
    }, 100);
  });

  it('debe formatear el precio chileno correctamente', () => {
    expect(formatPrice(12345)).toBe('12.345');
    expect(formatPrice(999)).toBe('999');
  });
});
