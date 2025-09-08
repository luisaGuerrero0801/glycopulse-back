import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import mailerConfig from './mailer.config';
import * as nodemailer from 'nodemailer';

@Module({
  providers: [
    {
      provide: 'MAILER_TRANSPORTER',
      useFactory: () => nodemailer.createTransport(mailerConfig),
    },
    MailerService,
  ],
  exports: [MailerService],
})
export class MailerModule {}
