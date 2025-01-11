import { Response, Request } from "express";
import {
  auth,
  signInWithEmailAndPassword,
} from "../firebase/firebaseClient";

interface ILoginResponse {
  email: string,
  token: string
}


interface IRequestBody {
  email: string,
  password: string
}

class AuthenticationController {
  async login(request: Request, response: Response): Promise<void> {
    const { email, password }: IRequestBody = request.body;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      response.status(200).json({ email: user.email, token });
    } catch (error) {
      console.error("Authentication failed:", error);
      response.status(401).json({ error: "Authentication failed" });
    }
  }
}

export default new AuthenticationController();
