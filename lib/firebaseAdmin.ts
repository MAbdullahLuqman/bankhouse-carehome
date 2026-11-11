import "server-only";
import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function configured(value: string | undefined) {
  return Boolean(value && !value.startsWith("replace-with-") && value !== "admin@example.com");
}

export function isFirebaseEmulator() {
  return process.env.FIREBASE_USE_EMULATOR === "true" && process.env.NODE_ENV !== "production";
}

export function hasFirebaseAdminConfig() {
  if (process.env.NODE_ENV === "production" && (process.env.FIREBASE_USE_EMULATOR === "true" || process.env.FIREBASE_AUTH_EMULATOR_HOST || process.env.FIRESTORE_EMULATOR_HOST)) return false;
  return configured(process.env.FIREBASE_PROJECT_ID) && (isFirebaseEmulator() || (configured(process.env.FIREBASE_CLIENT_EMAIL) && configured(process.env.FIREBASE_PRIVATE_KEY)));
}

export function hasFirebaseAuthConfig() {
  return hasFirebaseAdminConfig()
    && (isFirebaseEmulator() || configured(process.env.FIREBASE_API_KEY))
    && Boolean(process.env.FIREBASE_ADMIN_EMAILS?.split(",").some(email => email.trim() && email.trim() !== "admin@example.com"));
}

export function getFirebaseAdmin() {
  if (!hasFirebaseAdminConfig()) throw new Error("Firebase Admin is not configured.");
  const projectId = process.env.FIREBASE_PROJECT_ID!;
  if (isFirebaseEmulator()) {
    process.env.FIREBASE_AUTH_EMULATOR_HOST ||= "127.0.0.1:9099";
    process.env.FIRESTORE_EMULATOR_HOST ||= "127.0.0.1:8080";
  }
  const app = getApps().find(item => item.name === "bank-house-admin") ?? initializeApp({
    ...(isFirebaseEmulator() ? {} : { credential: cert({
      projectId,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n")
    }) }),
    projectId
  }, "bank-house-admin");
  return { auth: getAuth(app), db: getFirestore(app) };
}
