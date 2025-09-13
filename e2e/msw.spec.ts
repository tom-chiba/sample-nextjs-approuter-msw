import { expect, test } from "@playwright/test";

test.describe("MSW Integration", () => {
  // Run tests in this describe block sequentially.
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    // Wait for MSW to be ready before each test.
    const mswReady = page.waitForEvent("console", (message) => {
      return message.text().includes("[MSW] Mocking enabled.");
    });

    await page.goto("/");
    await mswReady;
  });

  test("should display mocked data from server-side fetch", async ({
    page,
  }) => {
    // The server-side fetch is mocked, so we should see the mocked message.
    const serverSideContainer = page
      .getByRole("heading", { name: "Server-Side Data" })
      .locator("..");
    await expect(serverSideContainer).toContainText("Message: Hello, MSW!");
  });

  test("should display mocked data from client-side fetch", async ({
    page,
  }) => {
    // Click the button to fetch data on the client side.
    await page.getByRole("button", { name: "Fetch Client-Side Data" }).click();

    // The client-side fetch should also be mocked.
    const clientSideContainer = page
      .getByRole("heading", { name: "Client-Side Data" })
      .locator("..");
    await expect(clientSideContainer).toContainText(
      "Last client-side message: Hello, MSW!",
    );
  });
});
