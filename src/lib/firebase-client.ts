import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  getAppCheck,
  initializeAppCheck,
  ReCaptchaV3Provider,
  type AppCheck,
} from 'firebase/app-check';
import { getFirestore, type Firestore } from 'firebase/firestore';

type FirebaseClients = {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  appCheck: AppCheck | null;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function createFirebaseApp(): FirebaseApp {
  if (getApps().length) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

function createAppCheck(app: FirebaseApp): AppCheck | null {
  if (typeof window === 'undefined') {
    return null;
  }

  // Enable debug token when provided to simplify local development.
  if (process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN) {
    // @ts-expect-error Firebase attaches the token to the global scope
    self.FIREBASE_APPCHECK_DEBUG_TOKEN =
      process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN;
  }

  try {
    return initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_KEY ?? ''
      ),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (error) {
    // App Check has already been initialized.
    return getAppCheck(app);
  }
}

export function getFirebaseClients(): FirebaseClients {
  const app = createFirebaseApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const appCheck = createAppCheck(app);

  return { app, auth, firestore, appCheck };
}
