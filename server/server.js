import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Faltan credenciales de Email en el archivo .env");
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/send-email', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Nombre y email son requeridos.' });
    }

    const mailOptions = {
        from: `Tiendita de Halloween <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `🎃 Confirmación de tu pedido en la Tiendita de Halloween`,
        html: `
            <h2>¡Gracias por tu pedido de sustos, ${name}!</h2>
            <p>Hemos recibido tu solicitud y la prepararemos en nuestro caldero a la brevedad.</p>
            <p>Este es un correo de confirmación automático. Te contactaremos nuevamente desde <strong>${process.env.EMAIL_TO}</strong> si es necesario.</p>
            <hr>
            <p><small>Este mensaje fue enviado desde la Tiendita de Halloween el ${new Date().toLocaleString()}</small></p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error al enviar correo:", error);
            return res.status(500).json({ success: false, message: 'Error interno al enviar el correo.' });
        }
        console.log('Correo enviado con éxito a:', email);
        res.status(200).json({ success: true, message: '¡Correo enviado con éxito!' });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});