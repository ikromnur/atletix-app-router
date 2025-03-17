"use client";

import { TanstackProvider } from "./tanstack-provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <TanstackProvider>{children}</TanstackProvider>;
};

export default Provider;
