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

  it('debe validar dirección corta', () => {
    const errors = validateForm({ name: 'Test', email: 'test@test.com', address: 'Corta', paymentMethod: 'card', phone: '(2) 2123 4567', rut: '12345678-5' });
    expect(errors.address).toBe('La dirección es demasiado corta.');
  });

  it('debe validar teléfono corto', () => {
    const errors = validateForm({ name: 'Test', email: 'test@test.com', address: 'Calle Larga 123', paymentMethod: 'card', phone: '123', rut: '12345678-5' });
    expect(errors.phone).toBe('El teléfono es demasiado corto.');
  });

  it('debe validar formato RUT inválido', () => {
    const errors = validateForm({ name: 'Test', email: 'test@test.com', address: 'Calle Larga 123', paymentMethod: 'card', phone: '(2) 2123 4567', rut: '12345678' });
    expect(errors.rut).toBe('Formato de RUT inválido (ej: 12345678-9)');
  });

  it('debe validar dígito verificador RUT incorrecto', () => {
    const errors = validateForm({ name: 'Test', email: 'test@test.com', address: 'Calle Larga 123', paymentMethod: 'card', phone: '(2) 2123 4567', rut: '12345678-9' });
    expect(errors.rut).toBe('RUT inválido (dígito verificador no coincide)');
  });
});
