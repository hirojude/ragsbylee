import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { uploadFile } from "@/lib/storage";

export const createNewProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!featureImage) {
    throw new Error("Feature Image is required");
  }

  const newId = doc(collection(db, `ids`)).id;
  const featureImagePath = `products/${newId}/feature`;
  const featureImageURL = await uploadFile(featureImage, featureImagePath);

  let imageURLList = [];

  for (let i = 0; i < imageList?.length; i++) {
    const image = imageList[i];
    const imagePath = `products/${newId}/gallery/${i}`;
    const url = await uploadFile(image, imagePath);
    imageURLList.push(url);
  }

  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    featureImageURL: featureImageURL,
    imageList: imageURLList,
    id: newId,
    timestampCreate: Timestamp.now(),
  });
};

export const updateProduct = async ({ data, featureImage, imageList }) => {
  if (!data?.title) {
    throw new Error("Title is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  let featureImageURL = data?.featureImageURL ?? "";

  if (featureImage) {
    const featureImagePath = `products/${data.id}/feature`;
    featureImageURL = await uploadFile(featureImage, featureImagePath);
  }

  let imageURLList = imageList?.length === 0 ? data?.imageList : [];

  for (let i = 0; i < imageList?.length; i++) {
    const image = imageList[i];
    const imagePath = `products/${data.id}/gallery/${i}`;
    const url = await uploadFile(image, imagePath);
    imageURLList.push(url);
  }

  await setDoc(doc(db, `products/${data?.id}`), {
    ...data,
    featureImageURL: featureImageURL,
    imageList: imageURLList,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteProduct = async ({ id }) => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `products/${id}`));
};
