import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header Component (Testing)', () => {
  let container, root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    root.unmount();
    document.body.removeChild(container);
    container = null;
    root = null;
  });

  it('debe renderizar el título de Halloween correctamente', (done) => {
    root.render(<BrowserRouter><Header cartCount={0} /></BrowserRouter>);
    setTimeout(() => {
      const headerText = container.querySelector('.navbar-brand').textContent;
      expect(headerText).toContain('Tiendita de Halloween 👻');
      done();
    }, 100);
  });

  it('debe mostrar el contador de productos correcto', (done) => {
    root.render(<BrowserRouter><Header cartCount={5} /></BrowserRouter>);
    setTimeout(() => {
      const badge = container.querySelector('[data-testid="cart-badge"]');
      expect(badge).not.toBeNull();
      expect(badge.textContent.trim()).toBe('5');
      done();
    }, 100);
  });
});
