"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2, 
  ChevronRight, 
  Link2, 
  ExternalLink,
  Sparkles,
  RefreshCw,
  X,
  Mail,
  Smartphone,
  Calendar,
  Save,
  Eye
} from "lucide-react";

// Inline SVGs for social providers to guarantee error-free rendering and custom coloring
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.73-1.2 1.87-1.05 2.99 1.12.09 2.27-.58 3-1.43z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Accessible Switch Toggle Component
const Switch = ({ 
  checked, 
  onChange, 
  disabled 
}: { 
  checked: boolean; 
  onChange: (val: boolean) => void; 
  disabled?: boolean;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#605DEC] focus:ring-offset-2 ${
      checked ? "bg-[#605DEC]" : "bg-gray-200"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

interface Provider {
  id: string;
  name: string;
  icon: React.ComponentType;
  connected: boolean;
  email?: string;
  connectedAt?: string;
}

type RawProvider = Omit<Provider, "icon">;

interface SettingsTab {
  id: "profile" | "linked" | "security" | "privacy" | "notifications";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NotificationPreferences {
  email: {
    jobAlerts: boolean;
    marketing: boolean;
    security: boolean;
  };
  push: {
    directMessages: boolean;
    jobUpdates: boolean;
  };
  digest: "none" | "daily" | "weekly";
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  email: {
    jobAlerts: true,
    marketing: false,
    security: true,
  },
  push: {
    directMessages: true,
    jobUpdates: true,
  },
  digest: "daily",
};

const getIcon = (id: string) => {
  switch (id) {
    case "google": return GoogleIcon;
    case "github": return GithubIcon;
    case "apple": return AppleIcon;
    case "facebook": return FacebookIcon;
    case "twitter": return TwitterIcon;
    default: return Link2;
  }
};

const getDefaultProviders = (): Provider[] => [
  { id: "google", name: "Google", icon: GoogleIcon, connected: true, email: "samuel.doe@gmail.com", connectedAt: "May 12, 2026" },
  { id: "github", name: "GitHub", icon: GithubIcon, connected: false },
  { id: "apple", name: "Apple", icon: AppleIcon, connected: false },
  { id: "facebook", name: "Facebook", icon: FacebookIcon, connected: false },
  { id: "twitter", name: "Twitter", icon: TwitterIcon, connected: false }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"linked" | "profile" | "security" | "privacy" | "notifications">("linked");
  
  // Linked providers state
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Notification Preferences State
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [prefLoading, setPrefLoading] = useState<boolean>(true);
  const [prefSaving, setPrefSaving] = useState<boolean>(false);

  // Dialog / Modal state
  const [unlinkProvider, setUnlinkProvider] = useState<Provider | null>(null);
  const [linkProvider, setLinkProvider] = useState<Provider | null>(null);
  const [linkEmail, setLinkEmail] = useState("");
  
  // Custom toast notification state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Privacy Settings State
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showEarnings: false,
    discoverable: true,
  });
  const [privacyLoading, setPrivacyLoading] = useState(true);
  const [privacySaving, setPrivacySaving] = useState(false);

  // Fetch providers, notifications and privacy on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/account-links", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          const mapped = data.map((p: RawProvider) => ({
            ...p,
            icon: getIcon(p.id)
          }));
          setProviders(mapped);
        } else {
          throw new Error();
        }
      } catch {
        const stored = localStorage.getItem("artisan-linked-providers");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            const mapped = parsed.map((p: RawProvider) => ({
              ...p,
              icon: getIcon(p.id)
            }));
            setProviders(mapped);
          } catch {
            setProviders(getDefaultProviders());
          }
        } else {
          const defaults = getDefaultProviders();
          setProviders(defaults);
          localStorage.setItem("artisan-linked-providers", JSON.stringify(defaults.map((p) => ({
            id: p.id,
            name: p.name,
            connected: p.connected,
            email: p.email,
            connectedAt: p.connectedAt
          }))));
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchPreferences = async () => {
      try {
        setPrefLoading(true);
        const response = await fetch("/api/preferences", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          setPreferences(data);
        } else {
          throw new Error();
        }
      } catch {
        const stored = localStorage.getItem("artisan-notification-preferences");
        if (stored) {
          try {
            setPreferences(JSON.parse(stored));
          } catch {
            setPreferences(DEFAULT_PREFERENCES);
          }
        } else {
          setPreferences(DEFAULT_PREFERENCES);
          localStorage.setItem("artisan-notification-preferences", JSON.stringify(DEFAULT_PREFERENCES));
        }
      } finally {
        setPrefLoading(false);
      }
    };

    const fetchPrivacySettings = async () => {
      try {
        setPrivacyLoading(true);
        const response = await fetch("/api/user/privacy");
        if (response.ok) {
          const data = await response.json();
          setPrivacySettings(data);
        }
      } catch (error) {
        console.error("Failed to fetch privacy settings:", error);
      } finally {
        setPrivacyLoading(false);
      }
    };

    fetchAccounts();
    fetchPreferences();
    fetchPrivacySettings();
  }, []);

  // Helper to trigger toast notifications
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Perform Connect Action
  const handleConnectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkProvider) return;
    
    const emailToUse = linkEmail.trim() || `${localStorage.getItem("artisan-name")?.toLowerCase().replace(/\s+/g, ".") || "samuel"}@${linkProvider.id}.com`;
    
    setActionLoading(linkProvider.id);
    const targetProviderId = linkProvider.id;
    const providerName = linkProvider.name;
    setLinkProvider(null);
    setLinkEmail("");

    try {
      const res = await fetch("/api/account-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: targetProviderId, email: emailToUse }),
      });

      if (res.ok) {
        const updatedData = await res.json();
        const mapped = updatedData.map((p: RawProvider) => ({
          ...p,
          icon: getIcon(p.id)
        }));
        setProviders(mapped);
        showToast(`Successfully linked ${providerName} account!`, "success");
      } else {
        throw new Error();
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const updated = providers.map((p) => {
        if (p.id === targetProviderId) {
          return {
            ...p,
            connected: true,
            email: emailToUse,
            connectedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          };
        }
        return p;
      });
      setProviders(updated);
      localStorage.setItem("artisan-linked-providers", JSON.stringify(updated.map((p) => ({
        id: p.id,
        name: p.name,
        connected: p.connected,
        email: p.email,
        connectedAt: p.connectedAt
      }))));
      showToast(`Successfully linked ${providerName} account!`, "success");
    } finally {
      setActionLoading(null);
    }
  };

  // Perform Disconnect/Unlink Action
  const handleConfirmUnlink = async () => {
    if (!unlinkProvider) return;
    
    setActionLoading(unlinkProvider.id);
    const targetProviderId = unlinkProvider.id;
    const providerName = unlinkProvider.name;
    setUnlinkProvider(null);

    try {
      const res = await fetch(`/api/account-links?provider=${targetProviderId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const updatedData = await res.json();
        const mapped = updatedData.map((p: RawProvider) => ({
          ...p,
          icon: getIcon(p.id)
        }));
        setProviders(mapped);
        showToast(`Disconnected ${providerName} successfully.`, "success");
      } else {
        throw new Error();
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const updated = providers.map((p) => {
        if (p.id === targetProviderId) {
          return {
            ...p,
            connected: false,
            email: undefined,
            connectedAt: undefined,
          };
        }
        return p;
      });
      setProviders(updated);
      localStorage.setItem("artisan-linked-providers", JSON.stringify(updated.map((p) => ({
        id: p.id,
        name: p.name,
        connected: p.connected,
        email: p.email,
        connectedAt: p.connectedAt
      }))));
      showToast(`Disconnected ${providerName} successfully.`, "success");
    } finally {
      setActionLoading(null);
    }
  };

  // Check if we can disconnect
  const connectedCount = providers.filter(p => p.connected).length;
  
  const handleDisconnectClick = (provider: Provider) => {
    if (connectedCount <= 1) {
      showToast("Cannot disconnect the last remaining login provider. Link another account first.", "error");
      return;
    }
    setUnlinkProvider(provider);
  };

  // Preference Handlers
  const handleEmailToggle = (key: keyof NotificationPreferences["email"]) => {
    setPreferences((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        [key]: !prev.email[key],
      },
    }));
  };

  const handlePushToggle = (key: keyof NotificationPreferences["push"]) => {
    setPreferences((prev) => ({
      ...prev,
      push: {
        ...prev.push,
        [key]: !prev.push[key],
      },
    }));
  };

  const handleDigestChange = (val: NotificationPreferences["digest"]) => {
    setPreferences((prev) => ({
      ...prev,
      digest: val,
    }));
  };

  const handleSavePreferences = async () => {
    try {
      setPrefSaving(true);
      const res = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });

      if (res.ok) {
        const data = await res.json();
        setPreferences(data);
        showToast("Notification preferences updated successfully!", "success");
      } else {
        throw new Error();
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("artisan-notification-preferences", JSON.stringify(preferences));
      showToast("Notification preferences updated successfully!", "success");
    } finally {
      setPrefSaving(false);
    }
  };

  // Privacy Handlers
  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacySave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrivacySaving(true);

    try {
      const response = await fetch("/api/user/privacy", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(privacySettings),
      });

      if (response.ok) {
        showToast("Privacy settings saved successfully!", "success");
      } else {
        throw new Error("Persistence failed");
      }
    } catch (error) {
      showToast("Error saving settings. Please try again.", "error");
    } finally {
      setPrivacySaving(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-2">
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-xl border text-sm max-w-sm ${
              toast.type === "success" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                : toast.type === "error" 
                ? "bg-rose-50 border-rose-200 text-rose-800" 
                : "bg-[#F4F3FE] border-indigo-100 text-indigo-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <div className="font-medium">{toast.message}</div>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section with quick status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2.5">
            Settings <Sparkles className="w-5 h-5 text-indigo-500 fill-indigo-100" />
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm md:text-base">
            Configure your personal information, security preferences, and identity links.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2.5 border border-gray-200 rounded-xl shadow-xs self-start md:self-auto">
          <div className="flex -space-x-1.5 overflow-hidden">
            {providers.filter(p => p.connected).map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="w-7 h-7 rounded-full bg-gray-50 border border-white flex items-center justify-center shadow-xs">
                  <Icon />
                </div>
              );
            })}
          </div>
          <span className="text-xs font-semibold text-gray-600">
            {connectedCount} Account{connectedCount !== 1 ? "s" : ""} Linked
          </span>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation panel */}
        <div className="lg:col-span-1 space-y-2">
          {([
            { id: "profile", label: "Profile Details", icon: User },
            { id: "linked", label: "Linked Accounts", icon: Link2, badge: "Socials" },
            { id: "security", label: "Security & Login", icon: Shield },
            { id: "privacy", label: "Privacy Settings", icon: Eye },
            { id: "notifications", label: "Notifications", icon: Bell }
          ] as SettingsTab[]).map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 ${
                  active 
                    ? "bg-[#605DEC] text-white shadow-md font-semibold" 
                    : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4.5 h-4.5 ${active ? "text-white" : "text-gray-500"}`} />
                  <span className="text-sm">{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    active ? "bg-white/20 text-white" : "bg-indigo-50 text-[#605DEC]"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="p-4 bg-yellow-50/50 border border-yellow-200 rounded-xl mt-6">
            <div className="flex gap-2.5">
              <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-amber-800">Security Note</h4>
                <p className="text-[11px] text-amber-700/90 mt-1 leading-normal">
                  To protect your account, unlinking a social provider requires at least one other active login option (like freighter wallet or another social link).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration content panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {/* LINKED ACCOUNTS PANEL */}
            {activeTab === "linked" && (
              <motion.div
                key="linked"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Linked Login Providers</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Manage the connected social providers used to sign in to your artisan account.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => setLoading(false), 800);
                    }}
                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors"
                    title="Refresh connection state"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-[#605DEC]" />
                      <span className="text-sm text-gray-500 font-medium">Fetching connection status...</span>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-150">
                      {providers.map((provider) => {
                        const Icon = provider.icon;
                        const isActionLoading = actionLoading === provider.id;
                        return (
                          <div 
                            key={provider.id} 
                            className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4 first:pt-0 last:pb-0"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5">
                                <Icon />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-gray-900 text-base">{provider.name}</h3>
                                  {provider.connected ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                      Connected
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                      Not linked
                                    </span>
                                  )}
                                </div>
                                {provider.connected ? (
                                  <div className="mt-1.5 space-y-0.5">
                                    <p className="text-sm text-gray-600 font-medium">{provider.email}</p>
                                    <p className="text-xs text-gray-400">Linked on {provider.connectedAt}</p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-400 mt-1">
                                    Link your {provider.name} account to enable quick sign-in.
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center self-end sm:self-center">
                              {provider.connected ? (
                                <button
                                  onClick={() => handleDisconnectClick(provider)}
                                  disabled={isActionLoading || !!actionLoading}
                                  className="px-4 py-2 border border-red-200 hover:bg-rose-50 text-rose-600 font-semibold rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xs flex items-center gap-2"
                                >
                                  {isActionLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                                  ) : (
                                    "Disconnect"
                                  )}
                                </button>
                              ) : (
                                <button
                                  onClick={() => setLinkProvider(provider)}
                                  disabled={isActionLoading || !!actionLoading}
                                  className="px-4 py-2 bg-indigo-50 border border-indigo-100 text-[#605DEC] hover:bg-[#605DEC] hover:text-white font-semibold rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xs flex items-center gap-2"
                                >
                                  {isActionLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-[#605DEC]" />
                                  ) : (
                                    <>
                                      Connect <ChevronRight className="w-4 h-4" />
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-6 py-4.5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 
                    Securely connected via OAuth protocol.
                  </span>
                  <a 
                    href="https://artisyn.apidog.io" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[#605DEC] hover:underline font-semibold flex items-center gap-1"
                  >
                    API Documentation <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}

            {/* NOTIFICATION PREFERENCES PANEL */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Choose when and how you want to be notified about updates and activity.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setPrefLoading(true);
                      setTimeout(() => setPrefLoading(false), 500);
                    }}
                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors"
                    title="Reload Preferences"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6">
                  {prefLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-[#605DEC]" />
                      <span className="text-sm text-gray-500 font-medium">Fetching preferences...</span>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Section 1: Email Notifications */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                          <Mail className="w-5 h-5 text-indigo-500" />
                          <h3 className="text-base font-bold text-gray-800">Email Alerts</h3>
                        </div>

                        <div className="space-y-4.5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">New Job Alerts</h4>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                Receive email notifications when new job listings matching your skills are posted.
                              </p>
                            </div>
                            <Switch 
                              checked={preferences.email.jobAlerts} 
                              onChange={() => handleEmailToggle("jobAlerts")} 
                            />
                          </div>

                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">Account Security</h4>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                Get notified about login attempts, password changes, and security updates. (Highly Recommended)
                              </p>
                            </div>
                            <Switch 
                              checked={preferences.email.security} 
                              onChange={() => handleEmailToggle("security")} 
                            />
                          </div>

                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">Marketing & News</h4>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                Receive newsletters, product tips, and promotional updates about the platform.
                              </p>
                            </div>
                            <Switch 
                              checked={preferences.email.marketing} 
                              onChange={() => handleEmailToggle("marketing")} 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Push Notifications */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                          <Smartphone className="w-5 h-5 text-indigo-500" />
                          <h3 className="text-base font-bold text-gray-800">Push Notifications</h3>
                        </div>

                        <div className="space-y-4.5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">Direct Messages</h4>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                Get notified immediately when a client or admin sends you a chat message.
                              </p>
                            </div>
                            <Switch 
                              checked={preferences.push.directMessages} 
                              onChange={() => handlePushToggle("directMessages")} 
                            />
                          </div>

                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">Job Updates</h4>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                Get notified when a client views, replies, or changes the state of your active proposals.
                              </p>
                            </div>
                            <Switch 
                              checked={preferences.push.jobUpdates} 
                              onChange={() => handlePushToggle("jobUpdates")} 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Summary Digest Selection */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                          <Calendar className="w-5 h-5 text-indigo-500" />
                          <h3 className="text-base font-bold text-gray-800">Activity Digest</h3>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500 mb-3">
                            Choose how frequently you would like to receive general summaries of your profile view count, proposals, and active job statuses.
                          </p>

                          <div className="grid grid-cols-3 gap-3">
                            {([
                              { value: "none", label: "None", desc: "No reports" },
                              { value: "daily", label: "Daily", desc: "Every morning" },
                              { value: "weekly", label: "Weekly", desc: "Every Sunday" }
                            ] as const).map((opt) => {
                              const selected = preferences.digest === opt.value;
                              return (
                                <button
                                  type="button"
                                  key={opt.value}
                                  onClick={() => handleDigestChange(opt.value)}
                                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                                    selected 
                                      ? "border-[#605DEC] bg-indigo-50/50 text-[#605DEC] font-semibold" 
                                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                  }`}
                                >
                                  <span className="text-sm">{opt.label}</span>
                                  <span className="text-[10px] text-gray-400 font-normal mt-0.5">{opt.desc}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Save Button Action */}
                      <div className="flex items-center justify-end pt-5 border-t border-gray-150">
                        <button
                          type="button"
                          onClick={handleSavePreferences}
                          disabled={prefSaving}
                          className="px-6 py-2.5 bg-[#605DEC] hover:bg-[#4d4ac9] text-white font-semibold rounded-xl text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md flex items-center justify-center gap-2"
                        >
                          {prefSaving ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" /> Save Preferences
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-xs text-gray-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Your preferences are stored securely and synchronized using the User Settings API.
                </div>
              </motion.div>
            )}

            {/* PRIVACY SETTINGS PANEL */}
            {activeTab === "privacy" && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Privacy Settings</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Control your profile discoverability and visibility on the platform.
                    </p>
                  </div>
                  <button 
                    onClick={async () => {
                      setPrivacyLoading(true);
                      try {
                        const response = await fetch("/api/user/privacy");
                        if (response.ok) {
                          const data = await response.json();
                          setPrivacySettings(data);
                        }
                      } catch (error) {
                        console.error("Failed to fetch privacy settings:", error);
                      } finally {
                        setPrivacyLoading(false);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors"
                    title="Refresh privacy settings"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6">
                  {privacyLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-[#605DEC]" />
                      <span className="text-sm text-gray-500 font-medium">Fetching privacy settings...</span>
                    </div>
                  ) : (
                    <form onSubmit={handlePrivacySave} className="space-y-8">
                      {/* Profile Visibility */}
                      <section>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Profile Visibility
                        </label>
                        <select
                          value={privacySettings.profileVisibility}
                          onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                          className="w-full md:w-1/2 p-3 bg-gray-50 border border-gray-200 text-gray-950 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                        >
                          <option value="public">Public</option>
                          <option value="followers">Followers Only</option>
                          <option value="private">Private</option>
                        </select>
                        <p className="mt-2 text-xs text-gray-500">
                          Public profiles can be seen by anyone on the platform.
                        </p>
                      </section>

                      <hr className="border-gray-150" />

                      {/* Toggles */}
                      <div className="space-y-6">
                        {[
                          { id: "showEmail", label: "Show email on profile", desc: "Allow users to see your contact email address." },
                          { id: "showEarnings", label: "Display total earnings", desc: "Show your cumulative earnings to build trust." },
                          { id: "discoverable", label: "Search discoverability", desc: "Appear in the search results and artisan directory." }
                        ].map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex-grow pr-4">
                              <h3 className="text-sm font-semibold text-gray-800">{item.label}</h3>
                              <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handlePrivacyToggle(item.id as keyof typeof privacySettings)}
                              className={`${privacySettings[item.id as keyof typeof privacySettings] ? "bg-[#5eb65a]" : "bg-gray-300"} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                              <span className={`${privacySettings[item.id as keyof typeof privacySettings] ? "translate-x-6" : "translate-x-1"} pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out mt-1`} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-end pt-6 border-t border-gray-150 mt-6">
                        <button
                          type="submit"
                          disabled={privacySaving}
                          className="px-6 py-2.5 bg-[#605DEC] hover:bg-[#4d4ac9] text-white font-semibold rounded-xl text-sm transition-colors shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {privacySaving ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            )}

            {/* Sub-panels mock for premium settings layout */}
            {activeTab !== "linked" && activeTab !== "notifications" && activeTab !== "privacy" && (
              <motion.div
                key="mock"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4 border border-indigo-100">
                  {activeTab === "profile" && <User className="w-8 h-8 text-[#605DEC]" />}
                  {activeTab === "security" && <Shield className="w-8 h-8 text-[#605DEC]" />}
                </div>
                <h3 className="text-lg font-bold text-gray-900 capitalize">{activeTab} settings</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2">
                  This panel is currently mock-configured. Feel free to explore and manage your Linked Accounts tab in the sidebar!
                </p>
                <button
                  onClick={() => setActiveTab("linked")}
                  className="mt-6 px-4 py-2 bg-[#605DEC] hover:bg-[#4d4ac9] text-white font-semibold rounded-xl text-sm shadow-sm transition-colors duration-200"
                >
                  Manage Social Links
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confirmation Modal - Disconnect/Unlink Account */}
      <AnimatePresence>
        {unlinkProvider && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUnlinkProvider(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 w-full max-w-md relative z-10"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">Disconnect {unlinkProvider.name}?</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Are you sure you want to unlink your <strong>{unlinkProvider.name}</strong> ({unlinkProvider.email}) account? 
                    You will no longer be able to sign in using this provider.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-150">
                <button
                  onClick={() => setUnlinkProvider(null)}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmUnlink}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
                >
                  Yes, Disconnect
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Connection Popup Simulation Modal */}
      <AnimatePresence>
        {linkProvider && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLinkProvider(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden w-full max-w-md relative z-10"
            >
              {/* Header */}
              <div className="bg-[#F4F3FE] px-6 py-5 border-b border-indigo-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center flex-shrink-0">
                  {React.createElement(linkProvider.icon)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Connect to {linkProvider.name}</h3>
                  <p className="text-xs text-gray-500">Authorize connection to your social account</p>
                </div>
              </div>

              {/* Form content */}
              <form onSubmit={handleConnectSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Verify Email / Account ID
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. samuel.doe@gmail.com"
                    value={linkEmail}
                    onChange={(e) => setLinkEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                  <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                    By confirming, you authorize Artisyn.io to retrieve your profile email to map your identity for secure authentication.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-150 mt-6">
                  <button
                    type="button"
                    onClick={() => setLinkProvider(null)}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#605DEC] hover:bg-[#4d4ac9] text-white font-semibold rounded-xl text-sm transition-colors shadow-md flex items-center gap-2"
                  >
                    Authorize Link <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
