import { ASSISTANT_ENDPOINTS } from "../constants";
import type {
  AssistantSessionResponse,
  SendMessageRequest,
  SendMessageResponse,
} from "../types";
import { apiClient } from "@/shared/api";

/**
 * Every assistant HTTP call in one module, on top of the shared `apiClient`.
 * Components and hooks talk to these functions, never to `fetch`.
 */
export const assistantApi = {
  openSession(signal?: AbortSignal): Promise<AssistantSessionResponse> {
    return apiClient.get<AssistantSessionResponse>(ASSISTANT_ENDPOINTS.session, { signal });
  },

  sendMessage(payload: SendMessageRequest, signal?: AbortSignal): Promise<SendMessageResponse> {
    return apiClient.post<SendMessageResponse>(ASSISTANT_ENDPOINTS.messages, payload, { signal });
  },
};
