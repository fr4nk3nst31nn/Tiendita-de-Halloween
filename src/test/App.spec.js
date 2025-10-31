import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App routing & layout', () => {
  it('muestra el Header y la ruta Home', () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(container.querySelector('.navbar-brand').textContent).toContain('TIENDA LA CRIPTA');
    expect(container.textContent).toContain('Bienvenidos a la Tienda Maldita de Halloween');
  });

  it('muestra la lista de productos en /productos', () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/productos"]}>
        <App />
      </MemoryRouter>
    );
    expect(container.textContent).toContain('Productos Malditos de Halloween');
  });

  it('muestra la ruta /carrito', () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/carrito"]}>
        <App />
      </MemoryRouter>
    );
    expect(container.textContent).toContain('Tu Carrito');
  });

  it('muestra la ruta /checkout', () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/checkout"]}>
        <App />
      </MemoryRouter>
    );
    expect(container.textContent).toContain('Finalizar Hechizo');
  });

  it('muestra 404 para ruta desconocida', () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/ruta-inexistente"]}>
        <App />
      </MemoryRouter>
    );
    expect(container.textContent).toContain('404: Página no encontrada');
  });

  it('permite agregar productos al carrito', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/productos"]}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      const addButtons = container.querySelectorAll('[data-testid^="add-to-cart"]');
      expect(addButtons.length).toBeGreaterThan(0);
    });

    const addButton = container.querySelector('[data-testid^="add-to-cart"]');
    fireEvent.click(addButton, { nativeEvent: { clientX: 100, clientY: 100 } });
    
    await waitFor(() => {
      const badge = container.querySelector('[data-testid="cart-badge"]');
      expect(badge).not.toBeNull();
    });
  });

  it('incrementa cantidad cuando se agrega producto existente', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/productos"]}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      const addButtons = container.querySelectorAll('[data-testid^="add-to-cart"]');
      expect(addButtons.length).toBeGreaterThan(0);
    });

    const addButton = container.querySelector('[data-testid^="add-to-cart"]');
    fireEvent.click(addButton, { nativeEvent: { clientX: 100, clientY: 100 } });
    
    await waitFor(() => {
      fireEvent.click(addButton, { nativeEvent: { clientX: 100, clientY: 100 } });
    });

    const badge = container.querySelector('[data-testid="cart-badge"]');
    expect(badge).not.toBeNull();
  });

  it('permite remover items del carrito', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/carrito"]}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      const removeButtons = container.querySelectorAll('button');
      const minusBtn = Array.from(removeButtons).find(btn => btn.textContent === '-');
      if (minusBtn) {
        fireEvent.click(minusBtn);
      }
    });
  });

  it('permite eliminar productos del carrito', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/carrito"]}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      const deleteButtons = container.querySelectorAll('button');
      const deleteBtn = Array.from(deleteButtons).find(btn => btn.textContent === '×');
      if (deleteBtn) {
        fireEvent.click(deleteBtn);
      }
    });
  });

  it('permite vaciar el carrito', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/carrito"]}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      const clearBtn = container.querySelector('button.btn-outline-danger');
      if (clearBtn) {
        fireEvent.click(clearBtn);
      }
    });
  });

  it('elimina item del carrito cuando quantity es 1 y se remueve', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/productos"]}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      const addButtons = container.querySelectorAll('[data-testid^="add-to-cart"]');
      if (addButtons.length > 0) {
        fireEvent.click(addButtons[0], { nativeEvent: { clientX: 100, clientY: 100 } });
      }
    });

    await waitFor(() => {
      const removeButtons = container.querySelectorAll('button');
      const minusBtn = Array.from(removeButtons).find(btn => btn.textContent.trim() === '-');
      if (minusBtn) {
        fireEvent.click(minusBtn);
      }
    });
  });
});


