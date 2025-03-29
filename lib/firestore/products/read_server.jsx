import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const transformData = (doc) => {
  const data = doc.data();
  
  // Convert all Firestore Timestamp objects to plain objects
  if (data?.timestampCreate) {
    data.timestampCreate = {
      seconds: data.timestampCreate.seconds,
      nanoseconds: data.timestampCreate.nanoseconds
    };
  }
  if (data?.timestampUpdate) {
    data.timestampUpdate = {
      seconds: data.timestampUpdate.seconds,
      nanoseconds: data.timestampUpdate.nanoseconds
    };
  }
  
  return data;
};

export const getProduct = async ({ id }) => {
  const data = await getDoc(doc(db, `products/${id}`));
  if (data.exists()) {
    return transformData(data);
  } else {
    return null;
  }
};

export const getFeaturedProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), where("isFeatured", "==", true))
  );
  return list.docs.map(transformData);
};

export const getProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), orderBy("timestampCreate", "desc"))
  );
  return list.docs.map(transformData);
};

export const getProductsByCategory = async ({ categoryId }) => {
  const list = await getDocs(
    query(
      collection(db, "products"),
      orderBy("timestampCreate", "desc"),
      where("categoryId", "==", categoryId)
    )
  );
  return list.docs.map(transformData);
};
