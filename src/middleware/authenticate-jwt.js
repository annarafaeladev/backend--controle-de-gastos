import { firebaseAdmin } from "../firebase/firebaseAdmin.js";

export const authenticateToken = async (request, response, next) => {
  const jwt = request.headers.authorization.replace("Bearer ", "");

  if (!jwt) {
    return response.status(401).json({ message: "Usuario nao autenticado" });
  }

  let decodeIdToken = "";

  try {
    decodeIdToken = await firebaseAdmin.auth().verifyIdToken(jwt, true);
  } catch (error) {
    return response.status(401).json({ message: "Usuario nao autorizado" });
  }

  request.user = {
    uid: decodeIdToken.sub,
  };

  next();
};
