import { expect, test } from "@playwright/test";

test("distribuye el hero sin recortes en anchos representativos", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium");

  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 900, height: 600 },
    { width: 1024, height: 768 },
    { width: 1280, height: 720 },
    { width: 1903, height: 949 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    await page.evaluate(() => document.fonts.ready);

    const layout = await page.evaluate(() => {
      const box = (selector: string) =>
        document.querySelector(selector)!.getBoundingClientRect();
      const hero = box(".consulting-hero");
      const controls = box(".hero-slider-controls");
      const links = box(".hero-slide-consulting .hero-links");
      const portrait = box(".hero-slide-consulting .hero-visual");
      const copy = box(".hero-slide-consulting .hero-copy");
      const nav = box(".home-reference-nav");
      const logo = box(".site-header-home .site-logo");

      return {
        documentWidth: document.documentElement.scrollWidth,
        heroBottom: hero.bottom,
        controlsBottom: controls.bottom,
        linksBottom: links.bottom,
        portraitBottom: portrait.bottom,
        copyTop: copy.top,
        navLeft: nav.left,
        logoRight: logo.right,
      };
    });

    expect(layout.documentWidth, `${viewport.width}px: desbordamiento horizontal`).toBeLessThanOrEqual(viewport.width + 1);
    expect(layout.controlsBottom, `${viewport.width}px: controles fuera del hero`).toBeLessThan(layout.heroBottom);

    if (viewport.width < 900) {
      expect(layout.portraitBottom, `${viewport.width}px: imagen antes del texto`).toBeLessThanOrEqual(layout.copyTop);
    }

    if (viewport.width >= 1024) {
      expect(layout.navLeft, `${viewport.width}px: navegación sobre el logo`).toBeGreaterThanOrEqual(layout.logoRight + 16);
    }

    if (viewport.width >= 390) {
      expect(layout.heroBottom, `${viewport.width}px: no se asoma la sección siguiente`).toBeLessThanOrEqual(viewport.height - 20);
    }
  }
});
