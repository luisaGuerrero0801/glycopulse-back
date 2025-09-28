"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();
async function testGmailApi() {
    try {
        const oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET, process.env.GMAIL_REDIRECT_URI);
        oAuth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN,
        });
        const gmail = googleapis_1.google.gmail({ version: 'v1', auth: oAuth2Client });
        const makeBody = (to, subject, message) => {
            const str = [
                `To: ${to}`,
                `From: ${process.env.GMAIL_USER}`,
                'Content-Type: text/html; charset=UTF-8',
                `Subject: ${subject}`,
                '',
                message,
            ].join('\n');
            return Buffer.from(str)
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        };
        const raw = makeBody('destinatario@example.com', 'Prueba Gmail API Railway', '<h1>¡Hola desde Gmail API en Railway!</h1><p>Funciona sin SMTP.</p>');
        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: { raw },
        });
        console.log('✅ Correo enviado, ID:', res.data.id);
    }
    catch (err) {
        console.error('❌ Error enviando correo:', err);
    }
}
testGmailApi();
//# sourceMappingURL=test-mail.js.map