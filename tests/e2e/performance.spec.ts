import { expect, test } from "@playwright/test";

test.describe("Navegación sin JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  test("el menú móvil y sus enlaces funcionan antes de cargar JavaScript", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Abrir menú" }).click();
    const link = page.locator("#mobile-navigation").getByRole("link", { name: /Nosotros/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/nosotros$/);
    await expect(page.getByRole("heading", { name: "Nosotros", exact: true })).toBeVisible();
  });
});

test("precarga Nosotros y permite abrirlo sin otra petición de red", async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const prefetched = page.waitForResponse((response) =>
    new URL(response.url()).pathname === "/nosotros" &&
    response.request().headers()["rsc"] === "1" && response.ok(),
  );
  await page.goto("/");
  await (await prefetched).finished();
  await page.getByRole("button", { name: "Ver siguiente slide" }).click();
  await expect(page.locator(".consulting-hero")).toHaveAttribute("data-active-slide", "2");
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  const menu = page.getByRole("button", { name: "Abrir menú" });
  if (await menu.isVisible()) await menu.click();
  await context.setOffline(true);
  await page.locator("header").getByRole("link", { name: /Nosotros/ }).filter({ visible: true }).click();
  await expect(page).toHaveURL(/\/nosotros$/);
  await expect(page.getByRole("heading", { level: 1, name: "Nosotros" })).toBeVisible();
});

test("pospone el video fuera de pantalla y conserva reproducción al llegar", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const videoRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("juan-video-web.mp4")) videoRequests.push(request.url());
  });
  await page.goto("/");
  const video = page.locator("#nosotros video");
  await expect(video).toHaveAttribute("preload", "none");
  expect(videoRequests).toHaveLength(0);
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((node) => !(node as HTMLVideoElement).paused)).toBe(true);
  await expect.poll(() => video.evaluate((node) => (node as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(2);
});

test("el video conserva streaming por rangos y los recursos pueden reutilizarse", async ({ request }) => {
  const response = await request.get("/img/juan-video-web.mp4", { headers: { Range: "bytes=0-1023" } });
  expect(response.status()).toBe(206);
  expect(response.headers()["content-range"]).toMatch(/^bytes 0-1023\/\d+$/);
  expect((await response.body()).length).toBe(1024);
  expect(response.headers()["cache-control"]).toContain("max-age=3600");
  const font = await request.head("/fonts/PitagonSans-Regular.woff2");
  expect(font.ok()).toBe(true);
  expect(font.headers()["cache-control"]).toContain("max-age=3600");
});

test("el formulario sigue validando y enviando con la validación diferida", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({ json: { ok: true, delivered: true } }));
  await page.goto("/#contacto-footer");
  await page.getByLabel("Nombre", { exact: true }).fill("Prueba de rendimiento");
  await page.locator("#email").fill("prueba@example.com");
  await page.getByLabel("Teléfono", { exact: true }).fill("3001234567");
  await page.getByLabel("Mensaje", { exact: true }).fill("Solicitud de prueba del formulario compartido.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /enviar mensaje/i }).click();
  await expect(page.getByText("Gracias, recibimos tu solicitud.")).toBeVisible();
});
