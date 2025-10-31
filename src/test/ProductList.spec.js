import React from 'react';
import { render } from '@testing-library/react';
import ProductList from '../components/ProductList';

describe('ProductList', () => {
  it('muestra mensaje cuando no hay productos', () => {
    const { container } = render(<ProductList products={[]} onAddItem={() => {}} />);
    expect(container.textContent).toContain('No hay productos disponibles');
  });

  it('renderiza items cuando hay productos', () => {
    const products = [
      { id: 1, nombre: 'Calabaza', precio: 1000, imagen: 'a.png' },
      { id: 2, nombre: 'Fantasma', precio: 2000, imagen: 'b.png' },
    ];
    const { container } = render(<ProductList products={products} onAddItem={() => {}} />);
    expect(container.querySelectorAll('.product-item').length).toBe(2);
  });
});


