import type { ComponentType } from "react";

import { AuditPipeline } from "./audit-pipeline";
import { JarvisQueryPath, JarvisRelationshipModel } from "./jarvis-figures";
import { StoryboothConfigFlow } from "./storybooth-config-flow";
import type { FigureKey } from "../../types";

/**
 * Keeps case-study content serialisable: data references a figure by key and
 * this registry decides what renders.
 */
export const FIGURE_REGISTRY: Record<FigureKey, ComponentType> = {
  "storybooth-config-flow": StoryboothConfigFlow,
  "jarvis-query-path": JarvisQueryPath,
  "jarvis-relationship-model": JarvisRelationshipModel,
  "audit-pipeline": AuditPipeline,
};
