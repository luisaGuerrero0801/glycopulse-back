import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { createGmailTransporter } from './gmail.transporter';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    {
      provide: 'MAILER_TRANSPORTER',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>
        await createGmailTransporter(config),
    },
    MailerService,
  ],
  exports: [MailerService],
})
export class MailerModule {}
