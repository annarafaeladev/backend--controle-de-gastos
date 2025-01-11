import { Request, Response } from "express";
import { firebaseAdmin } from "../firebase/firebaseAdmin";
import { IUser } from "../interface/IUser";
import { ITransaction } from "../interface/ITransaction";





class TransactionController {
  findByUser(request: Request, response: Response): void {
    const user: Partial<IUser> = request.user;

    if (!user) {
      response.status(404).json({ error: "User not found" })
    }

    let transacitons: Array<ITransaction> = [];

    firebaseAdmin
      .firestore()
      .collection("transactions")
      .where("user.uid", "==", user.uid)
      .get()
      .then((snapshot) => {
        transacitons = snapshot.docs.map((doc) => ({
          uid: doc.id,
        }));
      });

    response.status(200).json(transacitons);
  }
}

export default new TransactionController();
