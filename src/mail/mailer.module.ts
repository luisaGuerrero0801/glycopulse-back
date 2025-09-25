import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import * as nodemailer from 'nodemailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }, // para tokens de verificación
      }),
    }),
  ],
  providers: [
    {
      provide: 'MAILER_TRANSPORTER',
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        nodemailer.createTransport({
          host: config.get<string>('EMAIL_HOST'),
          port: Number(config.get<number>('EMAIL_PORT')),
          secure: false,
          requireTLS: true,
          auth: {
            user: config.get<string>('EMAIL_USER'),
            pass: config.get<string>('EMAIL_PASS'),
          },
          tls: { rejectUnauthorized: false },
          logger: true,
        }),
    },
    MailerService,
  ],
  exports: [MailerService],
})
export class MailerModule {}
