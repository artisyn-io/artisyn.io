import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface ArtisanProfile {
  fullName: string;
  email: string;
  skillCategory: string;
  state: string;
  city: string;
  yearsOfExperience: string;
  bio: string;
  profileImageUrl: string | null;
}

const DEFAULT_PROFILE: ArtisanProfile = {
  fullName: 'Samuel Adeyemi',
  email: 'samuel@example.com',
  skillCategory: 'Carpentry',
  state: 'Lagos',
  city: 'Ikeja',
  yearsOfExperience: '5-10 years',
  bio: "I'm a skilled carpenter with over 7 years of experience in custom furniture, cabinetry, and general woodwork. I take pride in delivering quality craftsmanship that meets clients' exact specifications and timelines.",
  profileImageUrl: null,
};

const COOKIE_NAME = 'artisan-profile';

const TEXT_FIELDS = [
  'fullName',
  'email',
  'skillCategory',
  'state',
  'city',
  'yearsOfExperience',
  'bio',
] as const;

/** Keeps only known profile fields so unexpected payload keys are ignored. */
function sanitizeProfile(body: unknown): Partial<ArtisanProfile> {
  if (typeof body !== 'object' || body === null) {
    return {};
  }

  const record = body as Record<string, unknown>;
  const changes: Partial<ArtisanProfile> = {};

  for (const field of TEXT_FIELDS) {
    if (typeof record[field] === 'string') {
      changes[field] = record[field] as string;
    }
  }

  if (typeof record.profileImageUrl === 'string') {
    changes.profileImageUrl = record.profileImageUrl;
  } else if (record.profileImageUrl === null) {
    changes.profileImageUrl = null;
  }

  return changes;
}

async function readProfile(): Promise<ArtisanProfile> {
  const cookieStore = await cookies();
  const stored = cookieStore.get(COOKIE_NAME)?.value;

  if (!stored) {
    return DEFAULT_PROFILE;
  }

  try {
    return { ...DEFAULT_PROFILE, ...sanitizeProfile(JSON.parse(stored)) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

async function writeProfile(profile: ArtisanProfile) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(profile), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false,
    sameSite: 'lax',
  });
}

// GET /api/profile
export async function GET() {
  return NextResponse.json(await readProfile());
}

// PUT /api/profile — merges the provided fields into the stored profile.
export async function PUT(request: NextRequest) {
  try {
    const changes = sanitizeProfile(await request.json());
    const profile = { ...(await readProfile()), ...changes };
    await writeProfile(profile);
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json(
      { message: 'Failed to update profile' },
      { status: 500 },
    );
  }
}

// POST /api/profile — used by the onboarding flows, same merge semantics.
export async function POST(request: NextRequest) {
  return PUT(request);
}
