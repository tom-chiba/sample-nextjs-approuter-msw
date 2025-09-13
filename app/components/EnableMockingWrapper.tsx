"use client";

import { useEffect } from "react";

async function enableMocking() {
  if (process.env.NEXT_PUBLIC_ENABLE_MOCKING !== "true") {
    return;
  }

  const { worker } = await import("@/mocks/setup/browser");
  return worker.start();
}

export default function EnableMockingWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    enableMocking();
  }, []);

  return <>{children}</>;
}
