export type Language = 'ko' | 'en';
export type ThemeMode = 'auto' | 'light' | 'dark';
export type ColorTheme = 'darkblue' | 'safety' | 'forest' | 'sunset' | 'cherry';

export interface LearningPath {
  id: string;
  icon: string;
  nameKo: string;
  nameEn: string;
  descKo: string;
  descEn: string;
  color: string;
  path: string;
  topics: string[];
}

export interface Section {
  id: string;
  icon: string;
  ko: string;
  en: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  display_name: string;
  avatar_url: string;
  phone: string;
  provider: string;
  role: string;
  signup_domain: string;
  visited_sites: string[];
  last_sign_in_at: string;
  updated_at: string;
}

export interface AccountBlock {
  status: string;
  reason: string;
  suspended_until: string | null;
}

export type ToastType = 'info' | 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}
