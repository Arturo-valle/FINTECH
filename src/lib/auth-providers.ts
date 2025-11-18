import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

type ProviderKey = 'google' | 'linkedin' | 'microsoft';

interface ProviderConfig {
  key: ProviderKey;
  label: string;
  provider: GoogleAuthProvider | OAuthProvider | null;
  enabled: boolean;
  name: string;
}

const linkedinProviderId = process.env.NEXT_PUBLIC_FIREBASE_LINKEDIN_PROVIDER_ID;
const microsoftProviderId = process.env.NEXT_PUBLIC_FIREBASE_MICROSOFT_PROVIDER_ID;

export const authProviders: Record<ProviderKey, ProviderConfig> = {
  google: {
    key: 'google',
    label: 'Google',
    name: 'Google',
    provider: new GoogleAuthProvider(),
    enabled: process.env.NEXT_PUBLIC_FIREBASE_ENABLE_GOOGLE !== 'false',
  },
  linkedin: {
    key: 'linkedin',
    label: 'LinkedIn',
    name: 'LinkedIn',
    provider: linkedinProviderId ? new OAuthProvider(linkedinProviderId) : null,
    enabled: Boolean(linkedinProviderId),
  },
  microsoft: {
    key: 'microsoft',
    label: 'Microsoft',
    name: 'Microsoft',
    provider: microsoftProviderId ? new OAuthProvider(microsoftProviderId) : null,
    enabled: Boolean(microsoftProviderId),
  },
};

export type { ProviderKey, ProviderConfig };
