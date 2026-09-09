import type { ApiErrorBody } from "./api-error";

/** JSON success envelope for route handlers. */
export function apiSuccess<TData>(data: TData, init?: ResponseInit): Response {
  return Response.json(data, init);
}

/** Error envelope matching what `ApiClient` knows how to unwrap. */
export function apiError(
  message: string,
  options: { status: number; code?: string; details?: unknown },
): Response {
  const body: ApiErrorBody = {
    error: { message, code: options.code, details: options.details },
  };
  return Response.json(body, { status: options.status });
}
