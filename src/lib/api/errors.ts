/**
 * Normalized API client error.
 *
 * Thrown whenever a request resolves with a non-2xx status or an envelope
 * whose `success` flag is falsy. Carries the HTTP status, status text and the
 * (parsed) response body so callers can react to specific failures.
 */
export class ApiClientError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly data: unknown;

  constructor(
    message: string,
    status: number,
    statusText: string,
    data?: unknown
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.statusText = statusText;
    this.data = data;

    // Restore prototype chain for instanceof checks when targeting ES5/ES2017.
    Object.setPrototypeOf(this, ApiClientError.prototype);
  }

  /** Returns true when the response carries the given HTTP status code. */
  isStatus(status: number): boolean {
    return this.status === status;
  }
}
