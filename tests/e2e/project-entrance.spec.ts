import { expect, test } from "@playwright/test";

test("las fotos se descubren al entrar y los títulos esperan a su propia zona visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/proyectos");
  await expect(page.locator("[data-project-entrance]")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);

  for (const id of ["linea-proyectos", "linea-equipos", "linea-financiera"]) {
    // A new visit isolates the entrance: scrolling the previous copy can already
    // expose the next photo in a tall mobile viewport.
    if (id !== "linea-proyectos") await page.goto("/proyectos");
    const panel = page.locator(`#${id}`);
    const photo = panel.locator("[data-project-photo]");
    if (id !== "linea-proyectos") await expect(photo).toHaveAttribute("data-project-pending", "true");
    // Half a photo on screen is not enough: the entrance waits until it can be watched whole.
    await photo.evaluate((element) => {
      const box = element.getBoundingClientRect();
      scrollTo({ top: scrollY + box.top - innerHeight * 0.75, behavior: "instant" });
    });
    await page.waitForTimeout(300);
    if (id !== "linea-proyectos") await expect(photo).not.toHaveAttribute("data-project-entered", "true");
    await photo.evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
    await expect(photo).toHaveAttribute("data-project-entered", "true");
    await expect.poll(() => photo.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBeGreaterThan(0);
    await expect.poll(() => photo.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
    await expect(photo.locator("[data-project-aperture]")).toHaveCSS("clip-path", "none");

    const title = panel.locator("[data-project-heading]");
    if (id !== "linea-proyectos" && await title.evaluate((element) => element.getBoundingClientRect().top >= innerHeight)) {
      await expect(title).toHaveAttribute("data-project-pending", "true");
    }
    await title.scrollIntoViewIfNeeded();
    await expect(title).toHaveAttribute("data-project-entered", "true");
    await expect(title).toBeVisible();
    await expect.poll(() => title.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
    const includes = panel.locator("[data-project-includes]");
    await includes.scrollIntoViewIfNeeded();
    await expect(includes).toBeVisible();
    await expect(includes).toHaveAttribute("data-project-entered", "true");
  }
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("el movimiento reducido se aplica también al activarlo con la página abierta", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/proyectos");
  await expect(page.locator("#linea-financiera [data-project-photo]")).toHaveAttribute("data-project-pending", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-project-pending]")).toHaveCount(0);
  for (const id of ["linea-proyectos", "linea-equipos", "linea-financiera"]) {
    const panel = page.locator(`#${id}`);
    await panel.scrollIntoViewIfNeeded();
    await expect(panel.locator("[data-project-heading]")).toBeVisible();
    expect(await panel.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
    await expect(panel.locator("[data-project-aperture]")).toHaveCSS("clip-path", "none");
  }
});

test("sin JavaScript se muestran los tres paneles completos", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/proyectos");
  await expect(page.locator("[data-project-pending]")).toHaveCount(0);
  for (const id of ["linea-proyectos", "linea-equipos", "linea-financiera"]) {
    const panel = page.locator(`#${id}`);
    await panel.scrollIntoViewIfNeeded();
    await expect(panel.locator("[data-project-heading]")).toBeVisible();
    await expect(panel.locator("[data-project-photo]")).toHaveCSS("visibility", "visible");
  }
  await context.close();
});

test("cada panel cierra su foto y título al salir y se recupera al volver", async ({ page }) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const id of ["linea-proyectos", "linea-equipos", "linea-financiera"]) {
    await page.goto(`/proyectos#${id}`);
    const panel = page.locator(`#${id}`);
    for (const selector of ["[data-project-photo]", "[data-project-heading]"]) {
      const target = panel.locator(selector);
      await target.evaluate((element) => scrollTo({ top: scrollY + element.getBoundingClientRect().top - 160, behavior: "instant" }));
      await expect(target).toHaveAttribute("data-project-entered", "true");
      await expect.poll(() => target.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
      await target.evaluate((element) => {
        const box = element.getBoundingClientRect();
        scrollTo({ top: scrollY + box.bottom - 72 - box.height * 0.18, behavior: "instant" });
      });
      await expect(target).toHaveAttribute("data-project-state", "exiting");
      await expect.poll(() => target.evaluate((element) => element.getAnimations({ subtree: true }).every((animation) => animation.playState === "finished"))).toBe(true);
      expect(await target.evaluate((element) => getComputedStyle(element.querySelector("[data-project-aperture], [data-project-title-line]")!).clipPath)).not.toBe("none");
      await target.evaluate((element) => scrollTo({ top: scrollY + element.getBoundingClientRect().top - 160, behavior: "instant" }));
      await expect(target).toHaveAttribute("data-project-state", "visible");
      await expect.poll(() => target.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
      await expect(target.locator("[data-project-aperture], [data-project-title-line]").first()).toHaveCSS("clip-path", "none");
      await expect(target).toHaveCSS("opacity", "1");
    }
  }
});

test("un cambio rápido de dirección restaura la foto sin dejarla recortada", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/proyectos#linea-equipos");
  const photo = page.locator("#linea-equipos [data-project-photo]");
  await expect(photo).toHaveAttribute("data-project-entered", "true");
  await expect.poll(() => photo.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
  // Leave through the lower edge (scrolling upwards), then reverse immediately.
  await photo.evaluate((element) => scrollTo({ top: scrollY + element.getBoundingClientRect().top - innerHeight + element.getBoundingClientRect().height * 0.18, behavior: "instant" }));
  await expect(photo).toHaveAttribute("data-project-state", "exiting");
  await photo.evaluate((element) => scrollTo({ top: scrollY + element.getBoundingClientRect().top - 160, behavior: "instant" }));
  await expect(photo).toHaveAttribute("data-project-state", "visible");
  await expect.poll(() => photo.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
  await expect(photo.locator("[data-project-aperture]")).toHaveCSS("clip-path", "none");
  await expect(photo.locator("[data-project-surface]")).toHaveCSS("transform", "none");
});
