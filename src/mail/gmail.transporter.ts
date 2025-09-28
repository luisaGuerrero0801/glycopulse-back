import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export const createGmailTransporter = async (config: ConfigService) => {
  const oAuth2Client = new google.auth.OAuth2(
    config.get<string>('GMAIL_CLIENT_ID'),
    config.get<string>('GMAIL_CLIENT_SECRET'),
    config.get<string>('GMAIL_REDIRECT_URI')
  );

  oAuth2Client.setCredentials({
    refresh_token: config.get<string>('GMAIL_REFRESH_TOKEN'),
  });

  const accessToken = (await oAuth2Client.getAccessToken()).token;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: config.get<string>('GMAIL_USER'),
      clientId: config.get<string>('GMAIL_CLIENT_ID'),
      clientSecret: config.get<string>('GMAIL_CLIENT_SECRET'),
      refreshToken: config.get<string>('GMAIL_REFRESH_TOKEN'),
      accessToken,
    },
  });
};
