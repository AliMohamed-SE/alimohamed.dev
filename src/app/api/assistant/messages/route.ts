import type { NextRequest } from "next/server";

import { retrieveAnswer } from "@/features/assistant/server/retrieval";
import type { SendMessageRequest, SendMessageResponse } from "@/features/assistant/types";
import { apiError, apiSuccess } from "@/shared/api";

const MAX_MESSAGE_LENGTH = 2_000;

/** Stands in for model + retrieval latency so the UI's pending state is real. */
const SIMULATED_LATENCY_MS = 650;

function parseBody(value: unknown): SendMessageRequest | null {
  if (typeof value !== "object" || value === null) return null;
  const { conversationId, message } = value as Partial<SendMessageRequest>;
  if (typeof conversationId !== "string" || !conversationId.trim()) return null;
  if (typeof message !== "string" || !message.trim()) return null;
  return { conversationId, message };
}

/**
 * Answers one turn of the conversation. The retrieval itself is mocked; the
 * request/response shape is the one a real retrieval service would keep.
 */
export async function POST(request: NextRequest): Promise<Response> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return apiError("Request body must be valid JSON.", {
      status: 400,
      code: "invalid_json",
    });
  }

  const body = parseBody(payload);
  if (!body) {
    return apiError("Both `conversationId` and a non-empty `message` are required.", {
      status: 422,
      code: "invalid_request",
    });
  }

  if (body.message.length > MAX_MESSAGE_LENGTH) {
    return apiError(`Messages are limited to ${MAX_MESSAGE_LENGTH} characters.`, {
      status: 413,
      code: "message_too_long",
    });
  }

  const { text, nodes } = retrieveAnswer(body.message);
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));

  const response: SendMessageResponse = {
    conversationId: body.conversationId,
    reply: {
      id: crypto.randomUUID(),
      author: "assistant",
      text,
      nodes,
      createdAt: new Date().toISOString(),
    },
  };

  return apiSuccess(response);
}
