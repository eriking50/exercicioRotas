import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import TokenPayload from '../../types/TokenPayload';
import RequestWithUserData from '../../types/RequestWithUserData';
import { Role } from '../../types/Roles';

export const middlewareAutenticador = (req: RequestWithUserData, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send('unauthorized');
  }

  try {
    const payload = verify(authorization, process.env.AUTH_SECRET) as TokenPayload;
    req.usuario = payload;
  } catch (error) {
    return res.status(403).send('Forbidden');
  }

  next();
}

export const middlewareAutorizadorFuncionario = (req: RequestWithUserData, res: Response, next: NextFunction) => {
  const { usuario } = req;
  if (usuario.role !== Role.funcionarioViacao && usuario.role !== Role.admnistrador) {
    return res.status(403).send('Forbidden');
  }

  next();
}

export const middlewareAutorizadorAdmin = (req: RequestWithUserData, res: Response, next: NextFunction) => {
  const { usuario } = req;
  if (usuario.role !== Role.admnistrador) {
    return res.status(403).send('Forbidden');
  }

  next();
}