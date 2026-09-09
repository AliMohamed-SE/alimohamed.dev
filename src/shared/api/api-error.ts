/** Normalized failure shape every `apiClient` call rejects with. */
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(
    message: string,
    options: { status: number; code?: string; details?: unknown; cause?: unknown },
  ) {
    super(message, { cause: options.cause });
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }

  /** 0 means the request never reached the server (network failure, abort, timeout). */
  get isNetworkError(): boolean {
    return this.status === 0;
  }
}

/** Error payload route handlers return so the client can surface a real message. */
export type ApiErrorBody = {
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
};

export function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (typeof value !== "object" || value === null) return false;
  const candidate = (value as ApiErrorBody).error;
  return typeof candidate === "object" && candidate !== null && typeof candidate.message === "string";
}
