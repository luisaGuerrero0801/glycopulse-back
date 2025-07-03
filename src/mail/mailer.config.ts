import 'dotenv/config'; // Carga automáticamente las variables del .env

const mailerConfig = {
  host: process.env.EMAIL_HOST || '',
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
};

export default mailerConfig;
