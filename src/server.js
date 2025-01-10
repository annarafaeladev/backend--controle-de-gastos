import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import { auth, signInWithEmailAndPassword } from "./firebase/firebaseClient.js";
import { firebaseAdmin } from "./firebase/firebaseAdmin.js";
import { authenticateToken } from "./middleware/authenticate-jwt.js";

dotenv.config();

const app = express();
// Configurar o body-parser para processar JSON
app.use(bodyParser.json());

app.post("/auth/login", async (request, response) => {
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
});

app.get("/transactions", authenticateToken, async (request, response) => {
  firebaseAdmin
    .firestore()
    .collection("transactions")
    .where("user.uid", "==", request.user.uid)
    .get()
    .then((snapshot) => {
      const transacitons = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));

      response.json(transacitons);
    });
});

app.listen(3000, () =>
  console.log("API rest iniciada em http://localhost:3000")
);
