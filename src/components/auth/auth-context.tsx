'use client';

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type { User } from 'firebase/auth';
import type { UserRole } from '@/lib/types';
import { useFirebase } from '@/lib/firebase-provider';

interface AuthContextValue {
  user: User | null;
  userRole: UserRole;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, userRole } = useFirebase();
  return <AuthContext.Provider value={{ user, userRole }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
