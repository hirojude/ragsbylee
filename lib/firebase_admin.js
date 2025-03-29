export const admin = require("firebase-admin");

if (!process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEYS) {
  throw new Error("NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEYS environment variable is not set");
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEYS);
} catch (error) {
  console.error("Error parsing service account keys:", error);
  throw new Error("Invalid NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEYS format. Please ensure it's a valid JSON string.");
}

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminDB = admin.firestore();
