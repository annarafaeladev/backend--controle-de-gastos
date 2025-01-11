import { Request, Response, NextFunction } from "express";
import { IDecodeIdToken } from './../interface/IDecodeIdToken';
import { firebaseAdmin } from "../firebase/firebaseAdmin";
import { ILoginRequest } from "../interface/ILoginRequest";


export const authenticateToken = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { authorization } = request.headers;

  const jwt = authorization ? authorization.replace("Bearer ", "") : null;

  if (jwt === null) {
    response.status(401).json({ message: "Usuario nao autenticado" });
    return;
  }

  let decodeIdToken: IDecodeIdToken = {
    sub: ""
  };

  try {
    decodeIdToken = await firebaseAdmin.auth().verifyIdToken(jwt, true);
  } catch (error) {
    response.status(401).json({ message: "Usuario nao autorizado" });
  }

  request.user = {
    uid: decodeIdToken.sub,
  };

  next();
};

export const loginCredencials = (request: Request, response: Response, next: NextFunction): void => {
  const { email, password }: ILoginRequest = request.body;

  if (
    !email ||
    email.split("@")?.length < 2 ||
    !password ||
    password?.length < 6
  ) {
    response.status(401).json({ message: "Credenciais inválidas" });
  }

  next();
};
