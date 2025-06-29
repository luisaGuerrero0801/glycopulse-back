
import * as nodemailer from 'nodemailer';
import mailerConfig from './mailer.config'; 


const transporter = nodemailer.createTransport({
  host: mailerConfig.host,
  port: mailerConfig.port,
  secure: false,
  auth: mailerConfig.auth,
});

export default async function enviarCorreo(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: `"Mi App" <${mailerConfig.auth.user}>`,
      to,
      subject,
      html,
    });

    console.log('📬 Correo enviado:', info.messageId);
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
  }
}
