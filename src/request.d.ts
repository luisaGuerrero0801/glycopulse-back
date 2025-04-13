import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Aquí puedes poner el tipo de tu usuario, por ejemplo, 'User' si tienes una clase de usuario
    }
  }
}
