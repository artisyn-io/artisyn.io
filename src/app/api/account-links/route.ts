import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface ProviderState {
  id: string;
  name: string;
  connected: boolean;
  email?: string;
  connectedAt?: string;
}

const DEFAULT_ACCOUNTS: ProviderState[] = [
  { id: "google", name: "Google", connected: true, email: "samuel.doe@gmail.com", connectedAt: "May 12, 2026" },
  { id: "github", name: "GitHub", connected: false },
  { id: "apple", name: "Apple", connected: false },
  { id: "facebook", name: "Facebook", connected: false },
  { id: "twitter", name: "Twitter", connected: false }
];

const COOKIE_NAME = "artisan-linked-accounts";

// Helper to get active accounts from cookie or defaults
async function getAccounts(): Promise<ProviderState[]> {
  const cookieStore = await cookies();
  const accountsCookie = cookieStore.get(COOKIE_NAME)?.value;
  
  if (!accountsCookie) {
    return DEFAULT_ACCOUNTS;
  }
  
  try {
    return JSON.parse(accountsCookie);
  } catch {
    return DEFAULT_ACCOUNTS;
  }
}

// Helper to save accounts list in cookie
async function saveAccounts(accounts: ProviderState[]) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(accounts), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false, // Accessible by client-side if fallback is needed
    sameSite: "lax",
  });
}

// GET /api/account-links
export async function GET() {
  const accounts = await getAccounts();
  return NextResponse.json(accounts);
}

// POST /api/account-links (Connect provider)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, email } = body;
    
    if (!provider || !email) {
      return NextResponse.json({ error: "Provider and email are required" }, { status: 400 });
    }
    
    const accounts = await getAccounts();
    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === provider) {
        return {
          ...acc,
          connected: true,
          email,
          connectedAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })
        };
      }
      return acc;
    });
    
    await saveAccounts(updatedAccounts);
    return NextResponse.json(updatedAccounts);
  } catch {
    return NextResponse.json({ error: "Failed to link account" }, { status: 500 });
  }
}

// DELETE /api/account-links (Disconnect/unlink provider)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");
    
    if (!provider) {
      return NextResponse.json({ error: "Provider is required" }, { status: 400 });
    }
    
    const accounts = await getAccounts();
    
    // Prevent unlinking the last remaining provider for safety
    const connectedCount = accounts.filter(acc => acc.connected).length;
    if (connectedCount <= 1 && accounts.find(acc => acc.id === provider)?.connected) {
      return NextResponse.json({ error: "Cannot disconnect last remaining login provider" }, { status: 400 });
    }
    
    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === provider) {
        return {
          ...acc,
          connected: false,
          email: undefined,
          connectedAt: undefined
        };
      }
      return acc;
    });
    
    await saveAccounts(updatedAccounts);
    return NextResponse.json(updatedAccounts);
  } catch {
    return NextResponse.json({ error: "Failed to unlink account" }, { status: 500 });
  }
}
