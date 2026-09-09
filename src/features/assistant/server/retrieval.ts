import type { AssistantMessage, AssistantSuggestion } from "../types";
import {
  FALLBACK_TEXT,
  GREETING_TEXT,
  HIRING_KEYS,
  HIRING_PROBE_TEXT,
  KNOWLEDGE_BASE,
  PROBLEM_PATTERNS,
  SUGGESTION_SEEDS,
} from "./knowledge-base";

/**
 * A stand-in for the real two-pass retrieval described in the JARVIS case
 * study: score the question against the corpus, then attach the graph nodes
 * the answer came from. Swapping this module for a real service (embeddings +
 * relationship traversal + a model call) is the only change the rest of the
 * app needs — the route handler and the client contract stay as they are.
 */

/** Long keys are stronger evidence than short ones, so they score double. */
function scoreKeys(haystack: string, keys: string[]): number {
  let score = 0;
  for (const key of keys) {
    if (haystack.includes(key)) score += key.length > 6 ? 2 : 1;
  }
  return score;
}

const DIRECT_MATCH_THRESHOLD = 3;

export type RetrievalResult = Pick<AssistantMessage, "text" | "nodes">;

export function retrieveAnswer(question: string): RetrievalResult {
  const normalized = question.toLowerCase();

  let best: (typeof KNOWLEDGE_BASE)[number] | null = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE_BASE) {
    const score = scoreKeys(normalized, entry.keys);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  const soundsLikeHiring = scoreKeys(normalized, HIRING_KEYS) > 0;

  // Someone describing a problem rather than asking about past work gets
  // matched against the shapes of project I've built, not the corpus.
  if (soundsLikeHiring && bestScore < DIRECT_MATCH_THRESHOLD) {
    let pattern: (typeof PROBLEM_PATTERNS)[number] | null = null;
    let patternScore = 0;
    for (const candidate of PROBLEM_PATTERNS) {
      const score = scoreKeys(normalized, candidate.keys);
      if (score > patternScore) {
        patternScore = score;
        pattern = candidate;
      }
    }

    if (pattern) {
      return {
        text: [
          `That sounds like it might be ${pattern.name}: ${pattern.note}`,
          "I'd want to hear the specifics before saying anything firmer; the shape of these things usually changes once you know the data and the constraints. Worth a real conversation. The Contact section is at the bottom.",
        ].join("\n\n"),
        nodes: [pattern.name.replace(/^(a|an) /, ""), "pattern match", "contact"],
      };
    }

    return { text: HIRING_PROBE_TEXT, nodes: ["freelance", "contact"] };
  }

  if (best) return { text: best.text, nodes: best.nodes };

  return { text: FALLBACK_TEXT, nodes: [] };
}

export function buildGreeting(): AssistantMessage {
  return {
    id: "greeting",
    author: "assistant",
    text: GREETING_TEXT,
    nodes: [],
    createdAt: new Date(0).toISOString(),
  };
}

export function buildSuggestions(): AssistantSuggestion[] {
  return SUGGESTION_SEEDS.map((seed) => ({ ...seed }));
}
