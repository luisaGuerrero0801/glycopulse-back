import { ConfigService } from '@nestjs/config';
export declare const createGmailClient: (config: ConfigService) => import("googleapis").gmail_v1.Gmail;
