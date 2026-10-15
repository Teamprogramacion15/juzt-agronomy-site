import { expect, test } from "@playwright/test";

test("EPSEA y el logo entran al llegar a la sección", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const section = page.locator(".epsea-section");
  const identity = section.locator(".epsea-identity");
  const logo = section.locator(".epsea-logo");

  await expect(identity).toHaveCSS("opacity", "0");
  await expect(logo).toHaveCSS("opacity", "0");

  await section.scrollIntoViewIfNeeded();
  await expect(identity).toHaveCSS("opacity", "1");
  await expect(logo).toHaveCSS("opacity", "1");
  await expect(identity).toHaveCSS("clip-path", "none");
});

test("EPSEA permanece visible con movimiento reducido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const section = page.locator(".epsea-section");
  await expect(section.locator(".epsea-identity")).toHaveCSS("opacity", "1");
  await expect(section.locator(".epsea-logo")).toHaveCSS("opacity", "1");
});
