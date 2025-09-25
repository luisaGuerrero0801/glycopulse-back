import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailerService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('MAILER_TRANSPORTER') private readonly transporter: Transporter
  ) {
    console.log('📦 Transporter inyectado y listo');
  }

  generateVerificationToken(userId: number): string {
    return this.jwtService.sign(
      { sub: userId },
      {
        expiresIn: '1d',
      }
    );
  }

  async sendVerificationEmail(to: string, token: string) {
    const frontendUrl = process.env.FRONTEND_URL;
    const verificationUrl = `${frontendUrl}/verify?token=${token}`;

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

    try {
      const info = await this.transporter.sendMail({
        from: `"GlycoPulse" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Verificación de cuenta - GlycoPulse',
        html,
      });
      console.log('✅ Correo de verificación enviado:', info.messageId);
    } catch (error) {
      console.error('❌ Error al enviar correo de verificación:', error);
    }
  }

  async sendRecoveryEmail(to: string, token: string) {
    const frontendUrl = process.env.FRONTEND_URL;
    const recoveryUrl = `${frontendUrl}/reset-password?token=${token}`;

    const html = `
      <div style="font-family: Arial, sans-serif;">
        <h2>Recuperación de contraseña - GlycoPulse</h2>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente botón para continuar:</p>
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

    try {
      const info = await this.transporter.sendMail({
        from: `"GlycoPulse" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Recuperación de contraseña - GlycoPulse',
        html,
      });
      console.log('✅ Correo de recuperación enviado:', info.messageId);
    } catch (error) {
      console.error('❌ Error al enviar correo de recuperación:', error);
    }
  }
}
