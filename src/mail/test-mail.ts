// eslint-disable-next-line @typescript-eslint/no-require-imports
const nodemailer = require('nodemailer');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require('dotenv');

dotenv.config();

// Variables de entorno ya cargadas por NestJS ConfigModule
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = Number(process.env.EMAIL_PORT) || 587;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS, // App Password si Gmail tiene 2FA
  },
  tls: { rejectUnauthorized: false },
  logger: true,
});

(async () => {
  try {
    const info = await transporter.sendMail({
      from: `"GlycoPulse" <${EMAIL_USER}>`,
      to: 'glycopulse@gmail.com',
      subject: '🚀 Prueba de correo desde GlycoPulse',
      html: `
        <h2>¡Hola!</h2>
        <p>Correo de prueba enviado desde tu backend con Nodemailer + Gmail.</p>
        <p><strong>Todo funciona correctamente ✅</strong></p>
      `,
    });
    console.log('✅ Correo enviado:', info.messageId);
  } catch (err) {
    console.error('❌ Error al enviar el correo:', err);
  }
})();
