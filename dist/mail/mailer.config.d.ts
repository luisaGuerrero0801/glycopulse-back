declare const mailerConfig: {
    host: string;
    port: number;
    secure: boolean;
    requireTLS: boolean;
    auth: {
        user: string;
        pass: string;
    };
    tls: {
        rejectUnauthorized: boolean;
    };
    logger: boolean;
    debug: boolean;
};
export default mailerConfig;
