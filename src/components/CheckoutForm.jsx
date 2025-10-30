import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export const validateForm = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = 'Tu nombre de mortal es requerido.';
  else if (data.name.trim().length < 3) errors.name = 'Debe tener al menos 3 caracteres.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) errors.email = 'Tu correo es requerido.';
  else if (!emailRegex.test(data.email)) errors.email = 'El formato del correo es inválido.';

  if (!data.address || !data.address.trim()) errors.address = 'La dirección es requerida.';
  else if (data.address.trim().length < 10) errors.address = 'La dirección es demasiado corta.';

  const digitsPhone = (data.phone || '').toString().replace(/\D/g, '');
  if (!data.phone) errors.phone = 'El teléfono es requerido.';
  else if (digitsPhone.length < 9) errors.phone = 'El teléfono es demasiado corto.';

  if (!data.rut) {
    errors.rut = 'El RUT es requerido.';
  } else {
    const clean = (data.rut || '').toString().replace(/\./g, '').replace(/\s/g, '').toUpperCase();
    const parts = clean.split('-');
    if (parts.length !== 2 || !/^[0-9]+$/.test(parts[0])) {
      errors.rut = 'Formato de RUT inválido (ej: 12345678-9)';
    } else {
      const num = parts[0];
      const dv = parts[1];
      let sum = 0;
      let mul = 2;
      for (let i = num.length - 1; i >= 0; i--) {
        sum += parseInt(num.charAt(i), 10) * mul;
        mul = mul === 7 ? 2 : mul + 1;
      }
      const res = 11 - (sum % 11);
      const calcDv = res === 11 ? '0' : res === 10 ? 'K' : String(res);
      if (calcDv !== dv.toUpperCase()) errors.rut = 'RUT inválido (dígito verificador no coincide)';
    }
  }

  if (!data.paymentMethod) errors.paymentMethod = 'Selecciona una forma de pago.';

  return errors;
};

function CheckoutForm() {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', paymentMethod: '', phone: '', rut: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [serverMessage, setServerMessage] = useState({ success: true, text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage({ success: true, text: '' });
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSending(true);
      try {
        const response = await fetch('http://localhost:3001/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            address: formData.address,
            paymentMethod: formData.paymentMethod,
            phone: formData.phone,
            rut: formData.rut,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          setIsSubmitted(true);
          setServerMessage({ success: true, text: result.message });
          setFormData({ name: '', email: '', address: '', paymentMethod: '', phone: '', rut: '' });
        } else {
          throw new Error(result.message || 'Error desconocido del servidor.');
        }
      } catch (error) {
        setServerMessage({ success: false, text: error.message });
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {isSubmitted && <Alert variant="success">{serverMessage.text}</Alert>}
      {!serverMessage.success && <Alert variant="danger">{serverMessage.text}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Nombre Completo</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Dirección del destinatario</Form.Label>
        <Form.Control as="textarea" rows={2} name="address" value={formData.address} onChange={handleChange} isInvalid={!!errors.address} data-testid="address-input" />
        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} data-testid="phone-input" placeholder="Ej: (2) 2123 4567" />
        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>RUT del destinatario</Form.Label>
        <Form.Control type="text" name="rut" value={formData.rut} onChange={handleChange} isInvalid={!!errors.rut} data-testid="rut-input" placeholder="12345678-9" />
        <Form.Control.Feedback type="invalid">{errors.rut}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Forma de pago</Form.Label>
        <Form.Select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} isInvalid={!!errors.paymentMethod} data-testid="payment-select">
          <option value="">-- Selecciona una opción --</option>
          <option value="card">Tarjeta de Crédito/Débito</option>
          <option value="transfer">Transferencia Bancaria</option>
          <option value="cash">Efectivo (cuando llegue la compra)</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.paymentMethod}</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" className="cyborg-btn" disabled={isSending} data-testid="submit-button">
        {isSending ? 'Lanzando Hechizo...' : 'Comprar Ahora'}
      </Button>
    </Form>
  );
}
export default CheckoutForm;