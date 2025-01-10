import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import { auth, signInWithEmailAndPassword } from "./firebase/firebaseClient.js";
import { firebaseAdmin } from "./firebase/firebaseAdmin.js";

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

app.get("/transactions", async (request, response) => {
  const jwt = request.headers.authorization.replace("Bearer ", "");

  if (!jwt) {
    return response.status(401).json({ message: "Usuario nao autenticado" });
  }

  let decodeIdToken;

  try {
    decodeIdToken = await firebaseAdmin.auth().verifyIdToken(jwt, true);
  } catch (error) {
    console.log(error.message);
    return response.status(401).json({ message: "Usuario nao autorizado" });
  }

  firebaseAdmin
    .firestore()
    .collection("transactions")
    .where("user.uid", "==", decodeIdToken.sub)
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
