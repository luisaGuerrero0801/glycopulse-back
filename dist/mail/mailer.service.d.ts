import { gmail_v1 } from 'googleapis';
import { JwtService } from '@nestjs/jwt';
export declare class MailerService {
    private readonly jwtService;
    private readonly gmail;
    constructor(jwtService: JwtService, gmail: gmail_v1.Gmail);
    generateVerificationToken(userId: number): string;
    private makeBody;
    private sendMail;
    sendVerificationEmail(to: string, token: string): Promise<void>;
    sendRecoveryEmail(to: string, token: string): Promise<void>;
}
