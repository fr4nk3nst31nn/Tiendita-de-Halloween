import React, { useState } from 'react';

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', phone: '', rut: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = (values) => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email) e.email = 'El correo electrónico es requerido';
    else if (!emailRegex.test(values.email)) e.email = 'El formato del correo electrónico no es válido';

    if (!values.password) e.password = 'La contraseña es requerida';
    else if (values.password.length < 8) e.password = 'La contraseña debe tener al menos 8 caracteres';

    const digitsPhone = (values.phone || '').replace(/\D/g, '');
    if (!values.phone) e.phone = 'El teléfono es requerido';
    else if (digitsPhone.length < 9) e.phone = 'Demasiado corto';

    if (!values.rut) {
      e.rut = 'El RUT es requerido';
    } else {
      const clean = (values.rut || '').replace(/\./g, '').replace(/\s/g, '').toUpperCase();
      const parts = clean.split('-');
      if (parts.length !== 2 || !/^[0-9]+$/.test(parts[0])) {
        e.rut = 'Formato de RUT inválido (ej: 12345678-9)';
      } else {
        const num = parts[0];
        const dv = parts[1];
        const calcDv = (() => {
          let sum = 0;
          let mul = 2;
          for (let i = num.length - 1; i >= 0; i--) {
            sum += parseInt(num.charAt(i), 10) * mul;
            mul = mul === 7 ? 2 : mul + 1;
          }
          const res = 11 - (sum % 11);
          if (res === 11) return '0';
          if (res === 10) return 'K';
          return String(res);
        })();
        if (calcDv !== dv.toUpperCase()) e.rut = 'RUT inválido (dígito verificador no coincide)';
      }
    }

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }

    setIsLoading(true);
    await sleep(2000);
    setIsLoading(false);
    setIsSuccess(true);
    console.log('Login exitoso:', { email: form.email, password: form.password, phone: form.phone, rut: form.rut });

    setTimeout(() => {
      setForm({ email: '', password: '', phone: '', rut: '' });
      setIsSuccess(false);
      setErrors({});
    }, 2000);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input id="email" data-testid="email-input" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <div className="error" data-testid="email-error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input id="password" data-testid="password-input" type="password" name="password" value={form.password} onChange={handleChange} />
        {errors.password && <div className="error" data-testid="password-error">{errors.password}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Teléfono</label>
        <input id="phone" data-testid="phone-input" name="phone" value={form.phone} onChange={handleChange} placeholder="Ej: (2) 2123 4567" />
        {errors.phone && <div className="error" data-testid="phone-error">{errors.phone}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="rut">RUT</label>
        <input id="rut" data-testid="rut-input" name="rut" value={form.rut} onChange={handleChange} placeholder="12345678-9" />
        {errors.rut && <div className="error" data-testid="rut-error">{errors.rut}</div>}
      </div>

      <button type="submit">Entrar</button>

      {isLoading && <div data-testid="loading-spinner">Cargando...</div>}
      {isSuccess && <div data-testid="success-message">¡Inicio de sesión exitoso!</div>}
    </form>
  );
}
