'use client';

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from 'react';

import type { AccountType } from '@/components/artisan/onboarding-types';

export interface ArtisanFormData {
  fullName: string;
  email: string;
  skillCategory: string;
  state: string;
  city: string;
  yearsOfExperience: string;
  profileImage: File | null;
  bio: string;
}

export interface ClientFormData {
  fullName: string;
  email: string;
  state: string;
  city: string;
  referralSource: string;
}

const STORAGE_KEY = 'artisan-onboarding-state';

interface PersistedState {
  accountType: AccountType;
  artisanData: ArtisanFormData;
  clientData: ClientFormData;
  completed: boolean;
}

interface OnboardingContextValue {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
  artisanData: ArtisanFormData;
  setArtisanData: (data: Partial<ArtisanFormData>) => void;
  clientData: ClientFormData;
  setClientData: (data: Partial<ClientFormData>) => void;
  completed: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  isHydrated: boolean;
}

const defaultArtisanData: ArtisanFormData = {
  fullName: '',
  email: '',
  skillCategory: '',
  state: '',
  city: '',
  yearsOfExperience: '',
  profileImage: null,
  bio: '',
};

const defaultClientData: ClientFormData = {
  fullName: '',
  email: '',
  state: '',
  city: '',
  referralSource: '',
};

function readPersistedState(): PersistedState {
  const fallback: PersistedState = {
    accountType: null,
    artisanData: defaultArtisanData,
    clientData: defaultClientData,
    completed: false,
  };

  if (typeof window === 'undefined') return fallback;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved) as Partial<PersistedState>;
    return {
      accountType: parsed.accountType ?? null,
      artisanData: { ...defaultArtisanData, ...parsed.artisanData },
      clientData: { ...defaultClientData, ...parsed.clientData },
      completed: parsed.completed ?? false,
    };
  } catch {
    return fallback;
  }
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

const emptySubscribe = () => () => {};

function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const isHydrated = useIsHydrated();
  const [initial] = useState(readPersistedState);

  const [accountType, setAccountTypeState] = useState<AccountType>(
    initial.accountType,
  );
  const [artisanData, setArtisanDataState] = useState<ArtisanFormData>(
    initial.artisanData,
  );
  const [clientData, setClientDataState] = useState<ClientFormData>(
    initial.clientData,
  );
  const [completed, setCompletedState] = useState<boolean>(initial.completed);

  const persist = useCallback(
    (next: PersistedState) => {
      if (typeof window === 'undefined') return;
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            accountType: next.accountType,
            artisanData: { ...next.artisanData, profileImage: null },
            clientData: next.clientData,
            completed: next.completed,
          }),
        );
      } catch {
        /* ignore storage failures */
      }
    },
    [],
  );

  const setAccountType = useCallback(
    (type: AccountType) => {
      setAccountTypeState(type);
      persist({ accountType: type, artisanData, clientData, completed });
    },
    [artisanData, clientData, completed, persist],
  );

  const setArtisanData = useCallback(
    (data: Partial<ArtisanFormData>) => {
      setArtisanDataState((prev) => {
        const next = { ...prev, ...data };
        persist({ accountType, artisanData: next, clientData, completed });
        return next;
      });
    },
    [accountType, clientData, completed, persist],
  );

  const setClientData = useCallback(
    (data: Partial<ClientFormData>) => {
      setClientDataState((prev) => {
        const next = { ...prev, ...data };
        persist({ accountType, artisanData, clientData: next, completed });
        return next;
      });
    },
    [accountType, artisanData, completed, persist],
  );

  const completeOnboarding = useCallback(() => {
    setCompletedState(true);
    setArtisanDataState(defaultArtisanData);
    setClientDataState(defaultClientData);
    persist({
      accountType,
      artisanData: defaultArtisanData,
      clientData: defaultClientData,
      completed: true,
    });
  }, [accountType, persist]);

  const resetOnboarding = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setAccountTypeState(null);
    setArtisanDataState(defaultArtisanData);
    setClientDataState(defaultClientData);
    setCompletedState(false);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        accountType,
        setAccountType,
        artisanData,
        setArtisanData,
        clientData,
        setClientData,
        completed,
        completeOnboarding,
        resetOnboarding,
        isHydrated,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return ctx;
}
