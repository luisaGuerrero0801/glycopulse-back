"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailerConfig = {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
    logger: true,
    debug: true,
};
exports.default = mailerConfig;
//# sourceMappingURL=mailer.config.js.map