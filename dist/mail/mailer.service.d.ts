import { Transporter } from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
export declare class MailerService {
    private readonly jwtService;
    private readonly transporter;
    constructor(jwtService: JwtService, transporter: Transporter);
    generateVerificationToken(userId: number): string;
    sendVerificationEmail(to: string, token: string): Promise<void>;
    sendRecoveryEmail(to: string, token: string): Promise<void>;
}
