import { validateForm } from '../components/CheckoutForm';

describe('Funcionalidad de Validación del Formulario', () => {

  it('debe mostrar error cuando el campo nombre está vacío o tiene menos de 3 caracteres', () => {
    let errors = validateForm({ name: 'J', email: 'test@correo.cl' });
    expect(errors.name).toBe('Debe tener al menos 3 caracteres.');
    
    errors = validateForm({ name: '', email: 'test@correo.cl' });
    expect(errors.name).toBe('Tu nombre de mortal es requerido.');
  });
  
  it('debe mostrar error para un formato de correo inválido', () => {
    const errors = validateForm({ name: 'Mortal', email: 'mailsinarroba.com' });
    expect(errors.email).toBe('El formato del correo es inválido.');
  });

  it('no debe mostrar errores para datos válidos', () => {
    const data = {
      name: 'Dracula',
      email: 'dracula@transilvania.com',
      address: 'Calle Cripta 123, Subsuelo',
      paymentMethod: 'card',
      phone: '(2) 2123 4567',
      rut: '12345678-5',
    };
    const errors = validateForm(data);
    expect(Object.keys(errors).length).toBe(0);
  });
});
