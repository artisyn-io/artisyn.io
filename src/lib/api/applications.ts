/**
 * Applications API service
 * Typed access to the job application endpoints.
 *
 * The endpoint stores submissions as loosely typed records, so responses are
 * normalised here to keep a single predictable shape in the UI.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const APPLICATION_STATES = [
  'Applied',
  'In Review',
  'Interviewing',
  'Accepted',
  'Rejected',
  'Withdrawn',
] as const;

export type ApplicationState = (typeof APPLICATION_STATES)[number];

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicant: string;
  company: string;
  location: string;
  state: ApplicationState;
  appliedAt: string;
  updatedAt: string;
}

export interface CreateApplicationInput {
  jobTitle: string;
  applicant: string;
  jobId?: string;
  jobShortDescription?: string;
  location?: string;
  company?: string;
}

export type ApplicationErrorCode = 'invalid' | 'duplicate' | 'request';

/** Error thrown by {@link createApplication} with a machine-readable code. */
export class ApplicationRequestError extends Error {
  readonly code: ApplicationErrorCode;
  readonly status: number;

  constructor(message: string, code: ApplicationErrorCode, status: number) {
    super(message);
    this.name = 'ApplicationRequestError';
    this.code = code;
    this.status = status;
  }
}

type UnknownRecord = Record<string, unknown>;

function toRecord(value: unknown): UnknownRecord {
  return typeof value === 'object' && value !== null
    ? (value as UnknownRecord)
    : {};
}

function firstString(...candidates: unknown[]): string {
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim() !== '') {
      return candidate;
    }
  }
  return '';
}

function toApplicationState(value: unknown): ApplicationState {
  return APPLICATION_STATES.find((state) => state === value) ?? 'Applied';
}

/** Maps a raw API record onto the {@link Application} shape used by the UI. */
export function normalizeApplication(raw: unknown): Application {
  const record = toRecord(raw);
  const payload = toRecord(record.payload);
  const appliedAt = firstString(record.createdAt, payload.appliedAt);

  return {
    id: firstString(record.id, payload.id),
    jobId: firstString(record.jobId, payload.jobId),
    jobTitle: firstString(record.jobTitle, payload.jobTitle),
    applicant: firstString(record.applicant, payload.applicant),
    company: firstString(record.company, payload.company, payload.clientName),
    location: firstString(record.location, payload.location),
    state: toApplicationState(record.state ?? payload.state),
    appliedAt,
    updatedAt: firstString(record.updatedAt, payload.updatedAt) || appliedAt,
  };
}

function toApplicationList(json: unknown): Application[] {
  if (Array.isArray(json)) {
    return json.map(normalizeApplication);
  }

  const nested = toRecord(json).applications;
  return Array.isArray(nested) ? nested.map(normalizeApplication) : [];
}

async function readMessage(res: Response, fallback: string): Promise<string> {
  const body = await res.json().catch(() => null);
  return firstString(toRecord(body).message) || fallback;
}

/** Fetches every application submitted by the current artisan. */
export async function fetchApplications(
  signal?: AbortSignal,
): Promise<Application[]> {
  const res = await fetch(`${API_BASE_URL}/api/applications`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    cache: 'no-store',
    signal,
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch applications: ${res.status} ${res.statusText}`,
    );
  }

  return toApplicationList(await res.json());
}

/**
 * Submits an application for a job.
 * Throws an {@link ApplicationRequestError} when the endpoint rejects it, so
 * callers can tell a duplicate apart from a validation or server failure.
 */
export async function createApplication(
  input: CreateApplicationInput,
  signal?: AbortSignal,
): Promise<Application> {
  const res = await fetch(`${API_BASE_URL}/api/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
    signal,
  });

  if (res.status === 409) {
    throw new ApplicationRequestError(
      await readMessage(res, 'You have already applied to this job.'),
      'duplicate',
      res.status,
    );
  }

  if (res.status === 400) {
    throw new ApplicationRequestError(
      await readMessage(res, 'Missing required application details.'),
      'invalid',
      res.status,
    );
  }

  if (!res.ok) {
    throw new ApplicationRequestError(
      await readMessage(res, 'Failed to submit application.'),
      'request',
      res.status,
    );
  }

  return normalizeApplication(await res.json());
}
