import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../components/Footer';

it('renderiza el pie de página con el texto esperado', () => {
  const { container } = render(<Footer />);
  expect(container.textContent).toContain('La Cripta');
});


