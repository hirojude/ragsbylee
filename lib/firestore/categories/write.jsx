import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { uploadFile } from "../../storage";

export const createNewCategory = async ({ data, image }) => {
  if (!image) {
    throw new Error("Image is Required");
  }
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.slug) {
    throw new Error("Slug is required");
  }

  const newId = doc(collection(db, `ids`)).id;
  const imagePath = `categories/${newId}`;
  const imageURL = await uploadFile(image, imagePath);

  await setDoc(doc(db, `categories/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
};

export const updateCategory = async ({ data, image }) => {
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.slug) {
    throw new Error("Slug is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  const id = data?.id;
  let imageURL = data?.imageURL;

  if (image) {
    const imagePath = `categories/${id}`;
    imageURL = await uploadFile(image, imagePath);
  }

  await updateDoc(doc(db, `categories/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteCategory = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `categories/${id}`));
};
