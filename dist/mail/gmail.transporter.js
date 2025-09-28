"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGmailTransporter = void 0;
const googleapis_1 = require("googleapis");
const nodemailer = require("nodemailer");
const createGmailTransporter = async (config) => {
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(config.get('GMAIL_CLIENT_ID'), config.get('GMAIL_CLIENT_SECRET'), config.get('GMAIL_REDIRECT_URI'));
    oAuth2Client.setCredentials({
        refresh_token: config.get('GMAIL_REFRESH_TOKEN'),
    });
    const accessToken = (await oAuth2Client.getAccessToken()).token;
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.get('GMAIL_USER'),
            clientId: config.get('GMAIL_CLIENT_ID'),
            clientSecret: config.get('GMAIL_CLIENT_SECRET'),
            refreshToken: config.get('GMAIL_REFRESH_TOKEN'),
            accessToken,
        },
    });
};
exports.createGmailTransporter = createGmailTransporter;
//# sourceMappingURL=gmail.transporter.js.map