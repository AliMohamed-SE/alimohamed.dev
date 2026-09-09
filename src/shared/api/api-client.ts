import { ApiError, isApiErrorBody } from "./api-error";

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export type RequestOptions = {
  /** Appended as a query string; `null`/`undefined` entries are dropped. */
  params?: QueryParams;
  headers?: HeadersInit;
  signal?: AbortSignal;
  /** Aborts the request after this many ms. Defaults to `DEFAULT_TIMEOUT_MS`. */
  timeoutMs?: number;
  /** Next.js fetch cache semantics — usable from server components. */
  cache?: RequestCache;
  next?: { revalidate?: number | false; tags?: string[] };
};

type MutationBody = unknown;

const DEFAULT_TIMEOUT_MS = 20_000;

/**
 * The single door to every HTTP call in the app. Features never call `fetch`
 * directly: they go through a typed method here so base URL resolution, JSON
 * encoding, timeouts and error normalization live in one place.
 *
 * Built on the native `fetch` rather than axios — it is what Next.js augments
 * (caching, revalidation, request deduping) and it works unchanged in server
 * components, route handlers and the browser.
 */
export class ApiClient {
  constructor(
    private readonly config: {
      baseUrl: string;
      defaultHeaders?: Record<string, string>;
      timeoutMs?: number;
    },
  ) {}

  get<TResponse>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.request<TResponse>("GET", path, undefined, options);
  }

  post<TResponse>(path: string, body?: MutationBody, options?: RequestOptions): Promise<TResponse> {
    return this.request<TResponse>("POST", path, body, options);
  }

  put<TResponse>(path: string, body?: MutationBody, options?: RequestOptions): Promise<TResponse> {
    return this.request<TResponse>("PUT", path, body, options);
  }

  patch<TResponse>(path: string, body?: MutationBody, options?: RequestOptions): Promise<TResponse> {
    return this.request<TResponse>("PATCH", path, body, options);
  }

  delete<TResponse>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.request<TResponse>("DELETE", path, undefined, options);
  }

  private async request<TResponse>(
    method: string,
    path: string,
    body: MutationBody,
    options: RequestOptions = {},
  ): Promise<TResponse> {
    const url = this.buildUrl(path, options.params);
    const timeoutMs = options.timeoutMs ?? this.config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    const signal = options.signal
      ? AbortSignal.any([options.signal, timeoutSignal])
      : timeoutSignal;

    const headers = new Headers({ Accept: "application/json", ...this.config.defaultHeaders });
    if (body !== undefined) headers.set("Content-Type", "application/json");
    new Headers(options.headers).forEach((value, key) => headers.set(key, value));

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal,
        cache: options.cache,
        next: options.next,
      });
    } catch (cause) {
      throw new ApiError(describeTransportFailure(cause, timeoutMs), { status: 0, cause });
    }

    const payload = await readBody(response);

    if (!response.ok) {
      throw new ApiError(
        isApiErrorBody(payload) ? payload.error.message : `Request failed with status ${response.status}`,
        {
          status: response.status,
          code: isApiErrorBody(payload) ? payload.error.code : undefined,
          details: isApiErrorBody(payload) ? payload.error.details : payload,
        },
      );
    }

    return payload as TResponse;
  }

  private buildUrl(path: string, params?: QueryParams): string {
    const base = this.config.baseUrl.replace(/\/$/, "");
    const suffix = path.startsWith("/") ? path : `/${path}`;
    const search = new URLSearchParams();

    for (const [key, value] of Object.entries(params ?? {})) {
      if (value === null || value === undefined) continue;
      search.set(key, String(value));
    }

    const query = search.toString();
    return `${base}${suffix}${query ? `?${query}` : ""}`;
  }
}

async function readBody(response: Response): Promise<unknown> {
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function describeTransportFailure(cause: unknown, timeoutMs: number): string {
  if (cause instanceof DOMException && cause.name === "TimeoutError") {
    return `Request timed out after ${timeoutMs}ms`;
  }
  if (cause instanceof DOMException && cause.name === "AbortError") {
    return "Request was cancelled";
  }
  return cause instanceof Error ? cause.message : "Network request failed";
}

/**
 * Route handlers live under `/api` on the same origin, so a relative base is
 * all the browser needs. On the server (RSC, route handlers calling out) a
 * relative URL has no origin to resolve against, hence the env fallbacks.
 */
function resolveBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  if (typeof window !== "undefined") return "/api";

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
    `http://localhost:${process.env.PORT ?? 3000}`;

  return `${origin.replace(/\/$/, "")}/api`;
}

export const apiClient = new ApiClient({ baseUrl: resolveBaseUrl() });
