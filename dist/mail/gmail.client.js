"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGmailClient = void 0;
const googleapis_1 = require("googleapis");
const createGmailClient = (config) => {
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(config.get('GMAIL_CLIENT_ID'), config.get('GMAIL_CLIENT_SECRET'), config.get('GMAIL_REDIRECT_URI'));
    oAuth2Client.setCredentials({
        refresh_token: config.get('GMAIL_REFRESH_TOKEN'),
    });
    return googleapis_1.google.gmail({ version: 'v1', auth: oAuth2Client });
};
exports.createGmailClient = createGmailClient;
//# sourceMappingURL=gmail.client.js.map