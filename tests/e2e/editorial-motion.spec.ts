import { expect, test } from "@playwright/test";

test("la entrada espera a que la foto esté dentro de la zona visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const photo = page.locator('[data-motion="image"]').first();
  // A small sliver at the bottom must not consume the one-time entrance.
  await photo.evaluate((element) => {
    const box = element.getBoundingClientRect();
    scrollTo({ top: scrollY + box.top - innerHeight + box.height * 0.1, behavior: "instant" });
  });
  await photo.locator("img").evaluate((image) => (image as HTMLImageElement).decode());
  await page.waitForTimeout(1200);
  expect(await photo.evaluate((element) => element.getAnimations().length)).toBe(0);
  await photo.evaluate((element) => {
    const box = element.getBoundingClientRect();
    scrollTo({ top: scrollY + box.top - innerHeight * 0.85 + box.height * 0.5, behavior: "instant" });
  });
  await expect.poll(() => photo.evaluate((element) => element.getAnimations().length)).toBeGreaterThan(0);
  await expect(photo).toHaveCSS("opacity", "1");
});

test("los textos de un grupo largo esperan individualmente a entrar en pantalla", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/privacidad");
  await expect(page.locator(".legal-page h1")).toHaveCSS("opacity", "1");
  const last = page.locator(".legal-page-note");
  await expect(last).toHaveCSS("opacity", "0");
  expect(await last.evaluate((element) => element.getAnimations().length)).toBe(0);
  await last.scrollIntoViewIfNeeded();
  await expect.poll(() => last.evaluate((element) => element.getAnimations().length)).toBeGreaterThan(0);
  await expect(last).toHaveCSS("opacity", "1");
});

test("combina entradas distintas y salidas discretas sin repetir la entrada completa", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const copy = page.locator('[data-motion="editorial"]').first();
  const photo = page.locator('[data-motion="image"]').first();
  await copy.scrollIntoViewIfNeeded();
  await expect.poll(() => copy.evaluate((element) => element.getAnimations().length)).toBeGreaterThan(0);
  await expect(copy).toHaveCSS("opacity", "1");
  await expect(photo).toHaveCSS("opacity", "1");
  await copy.evaluate((element) => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().bottom - element.getBoundingClientRect().height * 0.07, behavior: "instant" }));
  await expect(copy).toHaveCSS("opacity", "0.7");
  await copy.scrollIntoViewIfNeeded();
  await expect(copy).toHaveCSS("opacity", "1");
  await expect.poll(() => copy.evaluate((element) => element.getAnimations().length)).toBe(0);
  await expect(page.locator('#nosotros [data-motion], form [data-motion]')).toHaveCount(0);
});

test("movimiento reducido conserva texto, fotos y formulario sin animaciones de escena", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/proyectos", "/nosotros", "/casos-de-exito"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const motion = page.locator("[data-motion]");
    expect(await motion.count()).toBeGreaterThan(0);
    expect(await motion.evaluateAll((elements) => elements.every((element) => getComputedStyle(element).opacity === "1" && element.getAnimations().length === 0))).toBe(true);
  }
});
