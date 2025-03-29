import { db } from "../../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const createUser = async ({ uid, displayName, photoURL }) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      displayName: displayName,
      photoURL: photoURL ?? "",
      timestampCreate: Timestamp.now(),
    },
    { merge: true }
  );
};

export const updateFavorites = async ({ uid, favoriteList }) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      favorites: favoriteList,
    },
    {
      merge: true,
    }
  );
};

export const updateCarts = async ({ uid, list }) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      carts: list,
    },
    {
      merge: true,
    }
  );
};
