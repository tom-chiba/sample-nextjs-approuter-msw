export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NEXT_PUBLIC_ENABLE_MOCKING === "true"
  ) {
    const { server } = await import("@/mocks/setup/server");
    server.listen();
  }
}
