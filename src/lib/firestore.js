import firebaseAdmin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = (() => {
  if (firebaseAdmin.apps.length) {
    return firebaseAdmin.app();
  }
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
})();

export const firestore = getFirestore(app);
