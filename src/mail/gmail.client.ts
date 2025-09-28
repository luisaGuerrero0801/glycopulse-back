import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

export const createGmailClient = (config: ConfigService) => {
  const oAuth2Client = new google.auth.OAuth2(
    config.get<string>('GMAIL_CLIENT_ID'),
    config.get<string>('GMAIL_CLIENT_SECRET'),
    config.get<string>('GMAIL_REDIRECT_URI')
  );

  oAuth2Client.setCredentials({
    refresh_token: config.get<string>('GMAIL_REFRESH_TOKEN'),
  });

  return google.gmail({ version: 'v1', auth: oAuth2Client });
};
