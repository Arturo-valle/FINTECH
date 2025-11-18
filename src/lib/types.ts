export type UserRole =
  | 'guest'
  | 'member_user'
  | 'org_admin'
  | 'association_admin'
  | 'super_admin';

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  role: UserRole;
  organizationId: string | null; // Ref to organizations
  preferredLanguage: 'es' | 'en';
  createdAt: Date;
  updatedAt: Date;
}

export type OrganizationType =
  | 'startup'
  | 'bank'
  | 'investor'
  | 'partner'
  | 'regulator'
  | 'other';
export type OrganizationStage = 'idea' | 'mvp' | 'growing' | 'scaleup';

export interface Organization {
  id: string;
  name: string;
  logoId?: string;
  logoUrl?: string;
  type: OrganizationType;
  description: string;
  website: string;
  country: string;
  verticals: string[];
  stage: OrganizationStage;
  needs: string[];
  isMember: boolean;
  membershipTier: 'basic' | 'standard' | 'premium' | 'institucional';
  createdAt: Date;
  updatedAt: Date;
}

export interface Membership {
  id: string;
  organizationId: string;
  tier: string;
  status: 'pending' | 'active' | 'cancelled';
  startDate: Date;
  endDate: Date | null;
  billingSummary: string; // e.g., "Stripe Customer ID: cus_xxxx"
}

export type EventType = 'meetup' | 'summit' | 'webinar' | 'workshop';
export type EventMode = 'online' | 'onsite' | 'hybrid';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  mode: EventMode;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  speakers: { name: string; role: string; organization: string }[];
  isPublic: boolean;
  createdBy: string; // User uid
  createdAt: Date;
  updatedAt: Date;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  organizationId: string;
  status: 'registered' | 'waitlist' | 'attended' | 'no_show';
  createdAt: Date;
}

export type ResourceType =
  | 'law'
  | 'regulation'
  | 'guideline'
  | 'article'
  | 'slide'
  | 'video'
  | 'other';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  tags: string[];
  language: 'es' | 'en';
  storagePath: string; // Path in Cloud Storage
  summary: string;
  publishedAt: Date;
  createdBy: string; // User uid
  createdAt: Date;
  updatedAt: Date;
}

export type OpportunityType =
  | 'startup_need'
  | 'bank_challenge'
  | 'investor_thesis'
  | 'other';

export interface Opportunity {
  id: string;
  createdBy: string; // User uid
  organizationId: string;
  type: OpportunityType;
  title: string;
  description: string;
  desiredPartners: OrganizationType[];
  verticals: string[];
  status: 'open' | 'in_discussion' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Match {
  id: string;
  opportunityId: string;
  sourceOrganizationId: string;
  targetOrganizationId: string;
  matchScore: number; // 0-1
  explanation: string;
  createdAt: Date;
}

export type AiSessionType =
  | 'regulatory_assistant'
  | 'content_assistant'
  | 'ecosystem_analytics'
  | 'directory_search';

export interface AiSession {
  id: string;
  userId: string | null;
  type: AiSessionType;
  createdAt: Date;
  metadata: Record<string, any>;
}

export type NotificationType =
  | 'event_reminder'
  | 'news'
  | 'membership'
  | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  url: string;
  read: boolean;
  createdAt: Date;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  imageId?: string;
  imageUrl?: string;
}
