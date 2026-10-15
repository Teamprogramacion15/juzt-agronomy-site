import { expect, test } from "@playwright/test";

test("usa Pitagon Sans en las rutas principales sin desbordes", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium");

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 1280, height: 720 },
  ]) {
    await page.setViewportSize(viewport);

    for (const route of ["/", "/proyectos", "/casos-de-exito", "/privacidad"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);

      const typography = await page.evaluate(() => {
        const selectors = ["body", "main h1", "main p", "main .micro-label", "button", "input"];
        return {
          fonts: selectors.flatMap((selector) => {
            const element = document.querySelector(selector);
            return element ? [{ selector, family: getComputedStyle(element).fontFamily }] : [];
          }),
          overflow: document.documentElement.scrollWidth - innerWidth,
        };
      });

      for (const font of typography.fonts) {
        expect(font.family, `${route} ${viewport.width}px: ${font.selector}`).toContain("Pitagon Sans Slide");
      }
      expect(typography.overflow, `${route} ${viewport.width}px: desbordamiento horizontal`).toBeLessThanOrEqual(1);
    }
  }
});
