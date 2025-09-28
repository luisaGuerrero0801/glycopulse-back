const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN,
    },
    tls: { rejectUnauthorized: false },
    logger: true,
});
(async () => {
    try {
        const info = await transporter.sendMail({
            from: `"GlycoPulse" <${process.env.GMAIL_USER}>`,
            to: 'glycopulse@gmail.com',
            subject: '🚀 Prueba de correo desde GlycoPulse con Gmail API',
            html: `
        <h2>¡Hola!</h2>
        <p>Este es un correo de prueba enviado utilizando Nodemailer + Gmail OAuth2.</p>
        <p><strong>Integración con API funcionando correctamente ✅</strong></p>
      `,
        });
        console.log('✅ Correo enviado:', info.messageId);
    }
    catch (err) {
        console.error('❌ Error al enviar el correo:', err);
    }
})();
//# sourceMappingURL=test-mail.js.map