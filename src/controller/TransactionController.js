import { firebaseAdmin } from "../firebase/firebaseAdmin.js";

class TransactionController {
  findByUser(request, response) {
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
  }
}

export default new TransactionController();
