import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

const COOKIE_NAME = "artisan-notification-preferences";

async function getPreferences(): Promise<NotificationPreferences> {
  const cookieStore = await cookies();
  const prefCookie = cookieStore.get(COOKIE_NAME)?.value;
  if (!prefCookie) {
    return DEFAULT_PREFERENCES;
  }
  try {
    return JSON.parse(prefCookie);
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

async function savePreferences(prefs: NotificationPreferences) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(prefs), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false,
    sameSite: "lax",
  });
}

// GET /api/preferences
export async function GET() {
  const prefs = await getPreferences();
  return NextResponse.json(prefs);
}

// POST /api/preferences
export async function POST(request: NextRequest) {
  try {
    const prefs = await request.json();
    await savePreferences(prefs);
    return NextResponse.json(prefs);
  } catch {
    return NextResponse.json({ error: "Failed to update preferences" }, { status: 500 });
  }
}

// PUT /api/preferences
export async function PUT(request: NextRequest) {
  return POST(request);
}
