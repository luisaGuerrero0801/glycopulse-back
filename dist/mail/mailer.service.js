"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
const jwt_1 = require("@nestjs/jwt");
let MailerService = class MailerService {
    constructor(jwtService, transporter) {
        this.jwtService = jwtService;
        this.transporter = transporter;
        console.log('📦 Gmail Transporter cargado con OAuth2');
    }
    generateVerificationToken(userId) {
        return this.jwtService.sign({ sub: userId }, { expiresIn: '1d' });
    }
    async sendVerificationEmail(to, token) {
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
                from: `"GlycoPulse" <${process.env.GMAIL_USER}>`,
                to,
                subject: 'Verificación de cuenta - GlycoPulse',
                html,
            });
            console.log('✅ Correo de verificación enviado:', info.messageId);
        }
        catch (error) {
            console.error('❌ Error al enviar correo de verificación:', error);
        }
    }
    async sendRecoveryEmail(to, token) {
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
        try {
            const info = await this.transporter.sendMail({
                from: `"GlycoPulse" <${process.env.GMAIL_USER}>`,
                to,
                subject: 'Recuperación de contraseña - GlycoPulse',
                html,
            });
            console.log('✅ Correo de recuperación enviado:', info.messageId);
        }
        catch (error) {
            console.error('❌ Error al enviar correo de recuperación:', error);
        }
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('MAILER_TRANSPORTER')),
    __metadata("design:paramtypes", [jwt_1.JwtService, typeof (_a = typeof nodemailer_1.Transporter !== "undefined" && nodemailer_1.Transporter) === "function" ? _a : Object])
], MailerService);
//# sourceMappingURL=mailer.service.js.map