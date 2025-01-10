import {
  auth,
  signInWithEmailAndPassword,
} from "../firebase/firebaseClient.js";

class AuthenticationController {
  async login(request, response) {
    const { email, password } = request.body;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      response.json({ email: user.email, token });
    } catch (error) {
      console.error("Authentication failed:", error);
      response.status(401).json({ error: "Authentication failed" });
    }
  }
}

export default new AuthenticationController();
