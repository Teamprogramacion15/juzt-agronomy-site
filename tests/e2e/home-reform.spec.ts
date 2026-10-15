import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("presenta Home_4–10 en orden, con texto real y todos sus assets", async ({ page }) => {
  test.setTimeout(60_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("[data-home]")).toHaveCount(5);
  expect(await page.locator("[data-home]").evaluateAll((sections) => sections.map((section) => section.getAttribute("data-home")))).toEqual(["4", "5", "6", "7", "8"]);
  await expect(page.locator("#contacto-footer")).toHaveCount(1);
  await expect(page.getByRole("textbox", { name: "Nombre", exact: true })).toHaveCount(1);
  await expect(page.locator("#equipo-juzt, #servicios")).toHaveCount(0);
  await expect(page.locator("#rutas-turismo")).toHaveCount(0);
  for (const section of await page.locator("[data-home]").all()) {
    await section.scrollIntoViewIfNeeded();
    for (const image of await section.locator("img:visible").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((node) => (node as HTMLImageElement).decode());
    }
  }
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.locator("[data-home] h2, [data-home] p").evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).fontFamily));
  expect(fonts.every((font) => font.includes("Pitagon Sans Slide"))).toBe(true);
  expect(errors).toEqual([]);
});

test("mantiene legibles títulos y formulario desde 320 hasta 1907 px", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium");
  test.setTimeout(60_000);
  for (const width of [320, 390, 768, 1024, 1500, 1907]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - innerWidth,
      clipped: [...document.querySelectorAll<HTMLElement>("[data-home] h2, [data-home] h3, [data-home] p")].filter((node) => node.scrollWidth > node.clientWidth + 2).map((node) => node.textContent),
    }));
    expect(result.overflow, `Desborde a ${width}px`).toBeLessThanOrEqual(1);
    expect(result.clipped, `Texto cortado a ${width}px`).toEqual([]);
  }
});

test("el formulario conserva validación, errores y reintento sin enviar correos reales", async ({ page }) => {
  let attempts = 0;
  let sent: Record<string, unknown> = {};
  await page.route("**/api/contact", async (route) => {
    attempts += 1;
    sent = route.request().postDataJSON();
    await route.fulfill({ status: attempts === 1 ? 502 : 200, contentType: "application/json", body: JSON.stringify(attempts === 1 ? { ok: false, error: "Error de prueba. Intenta de nuevo." } : { ok: true, delivered: false }) });
  });
  await page.goto("/#contacto-footer");
  const contact = page.locator("#contacto-footer");
  await contact.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(contact.getByText("Ingresa tu nombre")).toBeVisible();
  expect(attempts).toBe(0);
  await contact.getByLabel("Nombre", { exact: true }).fill("Prueba visual");
  await contact.getByLabel("Correo", { exact: true }).fill("prueba@example.com");
  await contact.getByLabel("Teléfono", { exact: true }).fill("3000000000");
  await contact.getByLabel("País (opcional)", { exact: true }).fill("Colombia");
  await contact.getByLabel("Mensaje", { exact: true }).fill("Verificación local del formulario de contacto.");
  await contact.getByRole("checkbox").check();
  await contact.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(contact.getByText("Error de prueba. Intenta de nuevo.")).toBeVisible();
  await expect(contact.getByLabel("Nombre", { exact: true })).toHaveValue("Prueba visual");
  await contact.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(contact.getByRole("status")).toBeVisible();
  expect(sent).toMatchObject({ nombre: "Prueba visual", email: "prueba@example.com", pais: "Colombia", consent: true });
  await expect(contact.getByRole("link", { name: "WhatsApp", exact: true })).toHaveAttribute("href", /573113341341/);
  await contact.getByRole("button", { name: "Enviar otra solicitud" }).click();
  await expect(contact.getByLabel("Nombre", { exact: true })).toHaveValue("");
});

test("la navegación entre inicio e interiores conserva un único contacto", async ({ page }) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Abrir menú" });
  if (await menu.isVisible()) await menu.click();
  await page.locator("header").getByRole("link", { name: /Casos de éxito$/ }).click();
  await expect(page).toHaveURL(/\/casos-de-exito$/);
  await expect(page.locator("#contacto-footer")).toHaveCount(1);
  await page.goBack();
  await expect(page.locator('[data-home="8"]#contacto-footer')).toHaveCount(1);
  await expect(page.locator("footer#contacto-footer")).toHaveCount(0);
});
