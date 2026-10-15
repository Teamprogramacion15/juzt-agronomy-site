import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("las tres tarjetas llegan al panel correspondiente dentro de Proyectos", async ({ page }) => {
  for (const [name, id] of [
    ["Proyectos y consultoría", "linea-proyectos"],
    ["Equipos, insumos y tecnología", "linea-equipos"],
    ["Gestión financiera", "linea-financiera"],
  ] as const) {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#servicios, #equipo-juzt")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Conocer las líneas estratégicas" })).toHaveCount(0);
    const card = page.locator("#lineas-estrategicas").getByRole("link", { name, exact: true });
    await expect(card).toHaveAttribute("href", `/proyectos#${id}`);
    await card.click();
    await expect(page).toHaveURL(new RegExp(`/proyectos#${id}$`));
    const panel = page.locator(`#${id}`);
    await expect(panel.getByRole("heading").first()).toBeVisible();
    await expect.poll(() => panel.evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
    expect(await panel.evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(130);
    await expect(page.locator("#linea-proyectos, #linea-equipos, #linea-financiera")).toHaveCount(3);
  }
});

test("el botón del primer slide abre Proyectos con los tres PDF en orden", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const link = page.locator(".hero-slide-consulting").getByRole("link", { name: "Conoce nuestros proyectos" });
  await expect(link).toHaveAttribute("href", "/proyectos");
  await link.click();
  await expect(page).toHaveURL(/\/proyectos$/);
  const panels = page.locator("#linea-proyectos, #linea-equipos, #linea-financiera");
  expect(await panels.evaluateAll((nodes) => nodes.map((node) => node.id))).toEqual(["linea-proyectos", "linea-equipos", "linea-financiera"]);
  await expect(page.locator("main h1")).toHaveCount(1);
  for (const panel of await panels.all()) {
    await panel.scrollIntoViewIfNeeded();
    await expect(panel.getByRole("heading").first()).toBeVisible();
    await panel.locator("img").evaluate((image) => (image as HTMLImageElement).decode());
  }
});

test("los destinos de las tarjetas sobreviven a la recarga con las animaciones activas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const [name, id] of [["Proyectos y consultoría", "linea-proyectos"], ["Equipos, insumos y tecnología", "linea-equipos"], ["Gestión financiera", "linea-financiera"]]) {
    await page.goto("/");
    await page.locator("#lineas-estrategicas").getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/proyectos#${id}$`));
    const panel = page.locator(`#${id}`);
    await expect.poll(() => panel.evaluate((element) => Math.abs(element.getBoundingClientRect().top - Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)))).toBeLessThan(3);
    // Reload the completed destination, after navigation has painted and settled.
    await expect(panel.locator("[data-project-photo]")).toHaveAttribute("data-project-entered", "true");
    await expect.poll(() => panel.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
    await page.reload();
    await expect.poll(() => panel.evaluate((element) => {
      const offset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      return Math.abs(element.getBoundingClientRect().top - offset);
    })).toBeLessThan(3);
    const photo = panel.locator("[data-project-photo]");
    await expect(photo).toHaveAttribute("data-project-entered", "true");
    await expect.poll(() => photo.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
    await expect(photo.locator("[data-project-aperture]")).toHaveCSS("clip-path", "none");
  }
});

test("el menú abre Nosotros y enlaza a la web de maquinaria", async ({ page }) => {
  for (const [name, route] of [["Nosotros", "/nosotros"]]) {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const menu = page.getByRole("button", { name: "Abrir menú" });
    if (await menu.isVisible()) await menu.click();
    await expect(page.locator("header").getByRole("link", { name: /Equipos e insumos/ }).filter({ visible: true })).toHaveAttribute("href", "https://juztmaquinaria.lovable.app/");
    await page.locator("header").getByRole("link", { name: new RegExp(name ?? "") }).click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    if (route === "/nosotros") {
      await expect(page.getByRole("heading", { level: 2, name: "Nuestro Propósito" })).toBeVisible();
      await expect(page.locator("#equipo-juzt ol li")).toHaveCount(5);
      await expect(page.locator("#equipo-juzt tbody tr")).toHaveCount(4);
    }
    await expect(page.locator("header").getByRole("link", { name: /Gestión financiera/ })).toHaveCount(0);
  }
});

test("las páginas nuevas se adaptan desde 320 a 1907 px", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium");
  for (const width of [320, 390, 768, 1500, 1907]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/proyectos", "/equipos-e-insumos", "/gestion-financiera", "/nosotros"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), `${route}: ${width}px`).toBeLessThanOrEqual(1);
      expect(await page.locator("main h1, main h2, main h3, main p").evaluateAll((nodes) => nodes.filter((node) => node.clientWidth > 1 && node.scrollWidth > node.clientWidth + 2).map((node) => node.textContent)), `${route}: texto cortado a ${width}px`).toEqual([]);
    }
  }
});

test("la tarjeta responde al hover", async ({ page }) => {
  test.skip(test.info().project.name !== "chromium");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const card = page.locator("#lineas-estrategicas").getByRole("link", { name: "Proyectos y consultoría", exact: true });
  await card.hover();
  await expect.poll(() => card.evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m42)).toBeLessThan(-7);
});
