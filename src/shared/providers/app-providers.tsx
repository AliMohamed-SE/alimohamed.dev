import type { ReactNode } from "react";

import { QueryProvider } from "./query-provider";

/** Single place the root layout wires app-wide providers into the tree. */
export function AppProviders({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
