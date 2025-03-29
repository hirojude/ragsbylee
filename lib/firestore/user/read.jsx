"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useUser({ uid }) {
  const { data, error } = useSWRSubscription(
    ["users", uid],
    ([path, uid], { next }) => {
      if (!uid) {
        next(null, null);
        return () => {};
      }

      const ref = doc(db, `users/${uid}`);
      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          if (!snapshot.exists()) {
            next(new Error("User not found"), null);
            return;
          }
          next(null, snapshot.data());
        },
        (err) => {
          console.error("Error fetching user:", err);
          next(err, null);
        }
      );
      return () => unsub();
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  );

  return { 
    data, 
    error: error?.message, 
    isLoading: data === undefined && !error 
  };
}

export function useUsers() {
  const { data, error } = useSWRSubscription(["users"], ([path], { next }) => {
    const q = query(collection(db, path), orderBy("timestampCreate", "desc"));
    const unsub = onSnapshot(
      q,
      (snapshot) =>
        next(
          null,
          snapshot.docs.length === 0
            ? null
            : snapshot.docs.map((snap) => snap.data())
        ),
      (err) => next(err, null)
    );
    return () => unsub();
  });

  return { data, error: error?.message, isLoading: data === undefined };
}
