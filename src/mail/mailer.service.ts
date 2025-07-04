import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import mailerConfig from './mailer.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly jwtService: JwtService) {
    this.transporter = nodemailer.createTransport(mailerConfig);
    console.log('📦 Transporter creado con configuración:', mailerConfig);
  }

  generateVerificationToken(userId: number): string {
    return this.jwtService.sign(
      { sub: userId },
      {
        expiresIn: '1d', // Token válido por 24 horas
      }
    );
  }

  async sendVerificationEmail(to: string, token: string) {
    console.log('📨 Enviando correo a:', to);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verificationUrl = `${frontendUrl}/verify?token=${token}`;
    console.log('🔗 Enlace de verificación:', verificationUrl);

    const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        .button {
          display: inline-block;
          padding: 12px 24px;
          margin-top: 20px;
          font-size: 16px;
          color: #2563eb !important;
          background-color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          border: 2px solid #2563eb;
          font-weight: bold;
        }
        .container {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 32px;
          background-color: #f9f9f9;
          border-radius: 8px;
          color: #333;
          border: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Bienvenido a <span style="color: #2563eb;">GlycoPulse</span></h2>
        <p>Estimado usuario,</p>

        <p>
          Gracias por registrarse en <strong>GlycoPulse</strong>. Para completar su registro, es necesario verificar su cuenta.
        </p>

        <p>
          Por favor, haga clic en el siguiente botón para activar su cuenta:
        </p>

        <a href="${verificationUrl}" class="button">Activar cuenta</a>

        <p style="margin-top: 30px;">
          Si usted no solicitó esta cuenta, puede ignorar este mensaje.
        </p>

        <p>Atentamente,<br />
        El equipo de GlycoPulse</p>
      </div>
    </body>
  </html>
`;

    try {
      const info = await this.transporter.sendMail({
        from: `"GlycoPulse" <${mailerConfig.auth.user}>`,
        to,
        subject: 'Verificación de cuenta - GlycoPulse',
        html,
      });
      console.log('✅ Correo enviado:', info.messageId);
    } catch (error) {
      console.error('❌ Error al enviar el correo:', error);
    }
  }
}
