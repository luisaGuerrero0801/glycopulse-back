import { Inject, Injectable } from '@nestjs/common';
import { gmail_v1 } from 'googleapis';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('GMAIL_CLIENT') private readonly gmail: gmail_v1.Gmail
  ) {
    console.log('📦 Gmail Transporter cargado con OAuth2');
  }

  generateVerificationToken(userId: number): string {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '1d' });
  }

  private makeBody(to: string, subject: string, html: string) {
    const gmailUser = this.configService.get<string>('GMAIL_USER');
    if (!gmailUser) {
      throw new Error(
        'GMAIL_USER no está definido en las variables de entorno'
      );
    }
    const str = [
      `To: ${to}`,
      `From: GlycoPulse <${gmailUser}`,
      'Content-Type: text/html; charset=UTF-8',
      `Subject: ${subject}`,
      '',
      html,
    ].join('\n');

    return Buffer.from(str)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private async sendMail(to: string, subject: string, html: string) {
    try {
      const raw = this.makeBody(to, subject, html);
      const res = await this.gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw },
      });
      console.log(`✅ Correo enviado (${subject}):`, res.data.id);
    } catch (error) {
      console.error(`❌ Error enviando correo (${subject}):`, error);
    }
  }

  async sendVerificationEmail(to: string, token: string) {
    const backendUrl = this.configService.get<string>('BACKEND_URL');
    if (!backendUrl) {
      throw new Error(
        'BACKEND_URL no está definido en las variables de entorno'
      );
    }

    const verificationUrl = `${backendUrl}/auth/verify?token=${token}`;

    const html = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Bienvenido a <span style="color: #2563eb;">GlycoPulse</span></h2>
        <p>Gracias por registrarte. Haz clic en el siguiente botón para verificar tu cuenta:</p>
        <a href="${verificationUrl}" style="
          display: inline-block;
          padding: 12px 24px;
          font-size: 16px;
          color: #2563eb;
          background-color: #fff;
          border: 2px solid #2563eb;
          border-radius: 6px;
          font-weight: bold;
          text-decoration: none;
        ">Activar cuenta</a>
        <p style="margin-top: 30px;">Si no solicitaste esto, puedes ignorar este mensaje.</p>
      </div>
    `;
    await this.sendMail(to, 'Verificación de cuenta - GlycoPulse', html);
  }

  async sendRecoveryEmail(to: string, token: string) {
    const frontendUrl = process.env.FRONTEND_URL;
    const recoveryUrl = `${frontendUrl}/reset-password?token=${token}`;

    const html = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Recuperación de contraseña - GlycoPulse</h2>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <a href="${recoveryUrl}" style="
          display: inline-block;
          padding: 12px 24px;
          font-size: 16px;
          color: #fff;
          background-color: #2563eb;
          border-radius: 6px;
          font-weight: bold;
          text-decoration: none;
        ">Restablecer contraseña</a>
        <p style="margin-top: 30px;">Si no solicitaste esto, ignora este mensaje.</p>
      </div>
    `;

    await this.sendMail(to, 'Recuperación de contraseña - GlycoPulse', html);
  }
}
