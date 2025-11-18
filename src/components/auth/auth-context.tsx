'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { User } from 'firebase/auth';
import { signOut as firebaseSignOut } from 'firebase/auth';
import type { UserRole } from '@/lib/types';
import { useFirebase } from '@/lib/firebase-provider';

interface AuthContextValue {
  user: User | null;
  userRole: UserRole;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, userRole, auth, authLoading } = useFirebase();

  const value = useMemo(
    () => ({
      user,
      userRole,
      loading: authLoading,
      signOut: () => firebaseSignOut(auth),
    }),
    [auth, authLoading, user, userRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
