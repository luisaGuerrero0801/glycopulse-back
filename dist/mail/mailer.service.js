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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let MailerService = class MailerService {
    constructor(jwtService, configService, gmail) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.gmail = gmail;
        console.log('📦 Gmail Transporter cargado con OAuth2');
    }
    generateVerificationToken(userId) {
        return this.jwtService.sign({ sub: userId }, { expiresIn: '1d' });
    }
    makeBody(to, subject, html) {
        const gmailUser = this.configService.get('GMAIL_USER');
        if (!gmailUser) {
            throw new Error('GMAIL_USER no está definido en las variables de entorno');
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
    async sendMail(to, subject, html) {
        try {
            const raw = this.makeBody(to, subject, html);
            const res = await this.gmail.users.messages.send({
                userId: 'me',
                requestBody: { raw },
            });
            console.log(`✅ Correo enviado (${subject}):`, res.data.id);
        }
        catch (error) {
            console.error(`❌ Error enviando correo (${subject}):`, error);
        }
    }
    async sendVerificationEmail(to, token) {
        const backendUrl = this.configService
            .get('BACKEND_URL')
            .replace(/\/+$/, '');
        if (!backendUrl) {
            throw new Error('BACKEND_URL no está definido en las variables de entorno');
        }
        const verificationUrl = `${backendUrl}api/v1/auth/verify?token=${token}`;
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
        await this.sendMail(to, 'Recuperación de contraseña - GlycoPulse', html);
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('GMAIL_CLIENT')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService, googleapis_1.gmail_v1.Gmail])
], MailerService);
//# sourceMappingURL=mailer.service.js.map