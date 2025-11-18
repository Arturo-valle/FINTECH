'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getFirebaseClients } from './firebase-client';
import type { AppCheck } from 'firebase/app-check';
import type { FirebaseApp } from 'firebase/app';
import type { Auth, User as FirebaseUser } from 'firebase/auth';
import { getIdTokenResult, onAuthStateChanged } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { UserRole } from './types';

interface FirebaseContextValue {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  appCheck: AppCheck | null;
  user: FirebaseUser | null;
  userRole: UserRole;
  appCheckToken: string | null;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const { app, auth, firestore, appCheck } = useMemo(() => getFirebaseClients(), []);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [appCheckToken, setAppCheckToken] = useState<string | null>(null);

  useEffect(() => {
    if (!appCheck) return;

    import('firebase/app-check').then(({ getToken }) => {
      getToken(appCheck)
        .then((tokenResult) => {
          setAppCheckToken(tokenResult.token);
        })
        .catch(() => {
          setAppCheckToken(null);
        });
    });
  }, [appCheck]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const idTokenResult = await getIdTokenResult(firebaseUser, true);
          const claimRole = idTokenResult.claims.role as UserRole | undefined;
          setUserRole(claimRole ?? 'member_user');
        } catch (error) {
          console.error('Error fetching token claims', error);
          setUserRole('member_user');
        }
      } else {
        setUserRole('guest');
      }
    });

    return unsubscribe;
  }, [auth]);

  const value = useMemo(
    () => ({ app, auth, firestore, appCheck, user, userRole, appCheckToken }),
    [app, auth, firestore, appCheck, user, userRole, appCheckToken]
  );

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
