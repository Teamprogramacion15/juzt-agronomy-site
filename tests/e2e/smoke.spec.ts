import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test.describe("Nueva arquitectura JUZT 2026", () => {
  test("presenta la consultoría y las rutas principales", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /convertimos oportunidades en resultados/i,
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Proyectos", exact: true }).first()).toHaveAttribute(
      "href",
      "/proyectos",
    );
    await expect(page.getByRole("link", { name: "Nosotros", exact: true }).first()).toHaveAttribute(
      "href",
      "/#nosotros",
    );
    await expect(page.getByRole("link", { name: "Casos de éxito", exact: true }).first()).toHaveAttribute(
      "href",
      "/casos-de-exito",
    );
    await expect(page.getByRole("link", { name: /equipos e insumos/i }).first()).toHaveAttribute(
      "href",
      "https://juztmaquinaria.lovable.app/",
    );

    if ((page.viewportSize()?.width ?? 0) >= 900) {
      const equipment = page.locator(".header-equipment");
      await expect(equipment).toHaveCSS("background-color", "rgb(28, 96, 155)");
      await equipment.hover();
      await expect(equipment).toHaveCSS("background-color", "rgb(28, 96, 155)");
      await expect(equipment).not.toHaveCSS("transform", "none");
    }
  });

  test("oculta el navbar al bajar y lo recupera al subir", async ({ page }) => {
    await page.goto("/");

    const header = page.locator(".site-header");
    await expect(header).toHaveAttribute("data-hidden", "false");

    await page.mouse.wheel(0, 900);
    await expect(header).toHaveAttribute("data-hidden", "true");

    await page.mouse.wheel(0, -220);
    await expect(header).toHaveAttribute("data-hidden", "false");

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toHaveAttribute("data-hidden", "false");
  });

  test("mantiene la portada modular y la evidencia principal", async ({ page }) => {
    await page.goto("/");

    const impact = page.locator(".impact-strip");
    await expect(impact.locator("li")).toHaveCount(4);
    await expect(impact).toHaveAttribute("data-visible", "true");
    await expect(impact.locator(".impact-number-frame strong")).toHaveText([
      "37",
      "1.510",
      "8",
      "21",
    ]);
    await expect(impact.getByText(/cifras de impacto/i)).toHaveCount(0);
    await expect(impact.getByText(/impacto medible/i)).toHaveCount(0);
    await expect(impact.getByText(/evidencia acumulada/i)).toHaveCount(0);
    await expect(impact.locator(".impact-ledger-rail")).toHaveCount(0);
    await expect(impact.locator(".impact-metric-index")).toHaveCount(0);
    await expect(impact.locator(".impact-map")).toHaveCount(0);
    expect(
      await impact.locator(".impact-number-frame").first().evaluate(
        (element) => getComputedStyle(element, "::after").content,
      ),
    ).toBe("none");
    const epsea = page.locator(".epsea-section");
    await expect(epsea).toBeVisible();
    await expect(epsea).toContainText(
      "Empresa habilitada como EPSEA mediante resolución 048 del 01 de marzo de 2024 de la Agencia de Desarrollo Rural (ADR).",
    );
    const epseaStatement = epsea.locator(".epsea-statement");
    await expect(epseaStatement.locator("span, strong, em, small")).toHaveCount(0);
    await expect(epseaStatement).toHaveCSS("font-family", /Hanken Grotesk/);
    await expect(epseaStatement).toHaveCSS("font-weight", "320");
    await expect(epseaStatement).toHaveCSS("font-style", "normal");
    await expect(epsea.locator(".epsea-code")).toHaveCSS("justify-self", "center");
    await expect(epsea.locator(".epsea-code")).toHaveCSS("align-self", "center");
    await expect(epsea.locator(".epsea-code")).not.toHaveCSS("transform", "none");
    await expect(epsea.locator("aside")).toHaveCount(0);
    expect(
      await impact.evaluate((element) =>
        element.nextElementSibling?.classList.contains("epsea-section"),
      ),
    ).toBe(true);
    await expect(page.locator(".project-line-card")).toHaveCount(3);
    await expect(page.locator(".about-editorial")).toHaveCount(0);
    await expect(page.locator(".difference-section")).toHaveCount(0);
    await expect(page.locator(".project-lines")).toHaveCSS("color", "rgb(255, 255, 255)");
    expect(
      await page.locator(".project-lines").evaluate((element) =>
        getComputedStyle(element).backgroundImage,
      ),
    ).toContain("linear-gradient");
    expect(
      await page.locator(".epsea-section").evaluate((element) =>
        getComputedStyle(element).backgroundImage,
      ),
    ).not.toBe("none");
    expect(
      await page.locator(".allies-section").evaluate((element) =>
        getComputedStyle(element).backgroundImage,
      ),
    ).not.toBe("none");
    const statement = page.locator(".project-statement");
    await expect(statement.locator(".statement-image img")).toBeVisible();
    await expect(statement.locator(".statement-image img")).toHaveAttribute(
      "alt",
      "Planta joven sostenida por manos en un contexto agrícola",
    );
    const statementImageBox = await statement.locator(".statement-image").boundingBox();
    const statementTitleBox = await statement.getByRole("heading", { level: 2 }).boundingBox();
    expect(statementImageBox).not.toBeNull();
    expect(statementTitleBox).not.toBeNull();
    if ((page.viewportSize()?.width ?? 0) >= 900) {
      expect(statementImageBox!.x + statementImageBox!.width).toBeLessThan(
        statementTitleBox!.x,
      );
    } else {
      expect(statementImageBox!.y + statementImageBox!.height).toBeLessThan(
        statementTitleBox!.y,
      );
    }
    await expect(page.locator("#nosotros")).toBeVisible();
    const allies = page.locator("#aliados");
    await expect(allies.locator(".allies-group")).toHaveCount(2);
    await expect(allies.locator(".allies-group").first().locator("img")).toHaveCount(5);
    await expect(allies.locator('.allies-group[aria-hidden="true"] img')).toHaveCount(5);
    await expect(allies.locator(".allies-track")).toHaveCSS("animation-name", "none");
  });

  test("mueve los aliados en una cinta continua y accesible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");

    const allies = page.locator("#aliados");
    const track = allies.locator(".allies-track");
    const groups = allies.locator(".allies-group");

    await allies.scrollIntoViewIfNeeded();
    await expect(track).toHaveCSS("animation-name", "allies-conveyor");
    await expect(track).toHaveCSS("animation-timing-function", "linear");
    await expect(groups).toHaveCount(2);
    await expect(groups.nth(1)).toHaveAttribute("aria-hidden", "true");

    const groupWidths = await groups.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().width),
    );
    expect(Math.abs(groupWidths[0]! - groupWidths[1]!)).toBeLessThan(1);

    await page.mouse.move(0, 0);
    await expect(track).toHaveCSS("animation-play-state", "running");
    const initialX = await track.evaluate((element) => element.getBoundingClientRect().x);
    await page.waitForTimeout(300);
    const nextX = await track.evaluate((element) => element.getBoundingClientRect().x);
    expect(nextX).toBeLessThan(initialX);
  });

  test("revela las cifras de impacto en una secuencia de viewport", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");

    const impact = page.locator(".impact-strip");
    const metrics = impact.locator("li");
    await expect(impact).toHaveAttribute("data-visible", "false");
    await expect(metrics.first()).toHaveCSS("opacity", "0");

    await impact.scrollIntoViewIfNeeded();
    await expect(impact).toHaveAttribute("data-visible", "true");
    await expect(metrics.first()).toHaveCSS("opacity", "1");
    await expect(metrics.nth(3)).toHaveCSS("opacity", "1");
    await expect(impact.locator(".impact-number-frame strong")).toHaveText(
      ["37", "1.510", "8", "21"],
      { timeout: 3_000 },
    );
  });

  test("presenta un carrusel editorial accesible para consultoría y equipos", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator(".consulting-hero");
    await hero.getByRole("button", { name: "Pausar presentación" }).click();
    await expect(hero.locator("img")).toHaveCount(4);
    await expect(hero).toHaveAttribute("aria-roledescription", "carrusel");
    await expect(hero).toHaveAttribute("data-active-slide", "1");
    await expect(hero.locator(".hero-slide-consulting")).toHaveAttribute("aria-hidden", "false");
    await expect(hero.locator(".hero-slide-equipment")).toHaveAttribute("aria-hidden", "true");
    const person = hero.locator('img[alt="Profesional de JUZT"]');
    await expect(person).toBeVisible();
    await expect(hero.locator(".hero-person-composite")).toBeVisible();
    await expect(hero.locator(".hero-cartography svg")).toHaveCount(1);
    await expect(hero.locator(".hero-contour-lines path")).toHaveCount(3);
    await expect(hero.locator(".hero-cartography")).toHaveAttribute("aria-hidden", "true");
    await expect(hero.locator(".hero-cartography")).toHaveCSS("pointer-events", "none");
    expect(
      Number(await hero.locator(".hero-visual").evaluate((element) => getComputedStyle(element).zIndex)),
    ).toBeGreaterThan(
      Number(
        await hero.locator(".hero-cartography").evaluate(
          (element) => getComputedStyle(element).zIndex,
        ),
      ),
    );
    await expect(person).toHaveAttribute("src", /hero-person-integrated/);
    await expect(hero.locator('img[src*="logo_juzt_hero_white"]')).toBeVisible();
    const territory = hero.locator('img[src*="hero-territory-hq"]');
    await expect(territory).toBeVisible();
    await expect(territory).toHaveCSS("mix-blend-mode", "normal");
    await expect(hero.getByRole("button")).toHaveCount(5);
    await expect(hero.getByText(/consultoría para el territorio/i)).toHaveCount(0);
    await expect(hero.getByText(/JUZT \/ 2026/i)).toHaveCount(0);
    await expect(hero.getByText(/estrategia · gestión · ejecución/i)).toHaveCount(0);
    await expect(hero.getByRole("link", { name: /hablemos de tu proyecto/i })).toHaveAttribute(
      "href",
      /wa\.me/,
    );
    await expect(hero.getByRole("link", { name: /conoce nuestros proyectos/i })).toHaveAttribute(
      "href",
      "/proyectos",
    );
    await expect(hero.getByRole("link", { name: /equipos e insumos/i })).toHaveCount(0);
    const primaryCta = hero.getByRole("link", { name: /hablemos de tu proyecto/i });
    await expect(primaryCta).toHaveCSS("background-color", "rgb(28, 96, 155)");
    await primaryCta.hover();
    await expect(primaryCta).toHaveCSS("background-color", "rgb(25, 33, 71)");
    await expect(hero.locator(".hero-route-mark")).toHaveCount(0);
    await expect(hero.locator(".hero-launch-mark")).toHaveCount(3);
    await expect(hero.locator(".hero-launch-track svg")).toHaveCount(6);
    expect(await hero.locator(".hero-links").textContent()).not.toMatch(/[↗→]/);

    const titleBox = await hero.locator("h1").boundingBox();
    const paragraphBox = await hero.locator(".hero-lede").boundingBox();
    const linksBox = await hero.locator(".hero-links").boundingBox();
    const editorialBox = await hero.locator(".hero-editorial").boundingBox();
    const mainBox = await hero.locator(".hero-main").boundingBox();
    const visualBox = await hero.locator(".hero-visual").boundingBox();
    const brandBox = await hero.locator(".hero-brand-backdrop").boundingBox();
    const personBox = await hero.locator(".hero-person").boundingBox();
    await expect(hero.locator(".hero-visual-field")).toBeVisible();
    await expect(hero.locator(".hero-field-surface")).toHaveCount(1);
    await expect(hero.locator(".hero-field-outline")).toHaveCount(1);
    await expect(hero.locator(".hero-field-contour")).toHaveCount(0);
    await expect(hero.locator(".hero-brand-backdrop")).toHaveCSS("opacity", "1");
    await expect
      .poll(() =>
        hero.locator(".hero-brand-backdrop").evaluate((node) => {
          const clipPath = getComputedStyle(node).clipPath;
          return Number.parseFloat(clipPath.match(/([\d.]+)%/)?.[1] ?? "0");
        }),
      )
      .toBeGreaterThanOrEqual(47.1);
    const viewport = page.viewportSize();

    expect(titleBox).not.toBeNull();
    expect(paragraphBox).not.toBeNull();
    expect(linksBox).not.toBeNull();
    expect(editorialBox).not.toBeNull();
    expect(mainBox).not.toBeNull();
    expect(visualBox).not.toBeNull();
    expect(brandBox).not.toBeNull();
    expect(personBox).not.toBeNull();
    expect(paragraphBox!.y).toBeGreaterThan(titleBox!.y + titleBox!.height);
    expect(brandBox!.x).toBeGreaterThanOrEqual(visualBox!.x);
    expect(brandBox!.x + brandBox!.width).toBeLessThanOrEqual(
      visualBox!.x + visualBox!.width,
    );
    expect(brandBox!.y).toBeGreaterThanOrEqual(visualBox!.y);
    expect(brandBox!.y + brandBox!.height).toBeLessThanOrEqual(
      visualBox!.y + visualBox!.height,
    );
    expect(personBox!.y).toBeGreaterThanOrEqual(visualBox!.y - visualBox!.height * 0.06);
    expect(personBox!.y + personBox!.height).toBeLessThanOrEqual(
      visualBox!.y + visualBox!.height,
    );

    if ((viewport?.width ?? 0) >= 900) {
      expect(
        Math.abs(
          mainBox!.y - editorialBox!.y -
            (editorialBox!.y + editorialBox!.height - (mainBox!.y + mainBox!.height)),
        ),
      ).toBeLessThan(16);
      expect(visualBox!.x).toBeGreaterThan(titleBox!.x + titleBox!.width);
      expect(Math.abs(visualBox!.y - titleBox!.y)).toBeLessThan(8);
      expect(
        paragraphBox!.y - (titleBox!.y + titleBox!.height),
      ).toBeLessThan(visualBox!.height * 0.18);
      expect(
        linksBox!.y - (paragraphBox!.y + paragraphBox!.height),
      ).toBeGreaterThanOrEqual((viewport?.height ?? 0) <= 752 ? 24 : 32);
      expect(
        visualBox!.y + visualBox!.height - (linksBox!.y + linksBox!.height),
      ).toBeLessThan(visualBox!.height * 0.42);

      await page.setViewportSize({ width: 1920, height: 941 });
      await page.waitForTimeout(300);
      const wideTitleBox = await hero.locator("h1").boundingBox();
      const wideParagraphBox = await hero.locator(".hero-lede").boundingBox();
      const wideLinksBox = await hero.locator(".hero-links").boundingBox();
      const wideEditorialBox = await hero.locator(".hero-editorial").boundingBox();
      const wideMainBox = await hero.locator(".hero-main").boundingBox();
      expect(wideTitleBox).not.toBeNull();
      expect(wideParagraphBox).not.toBeNull();
      expect(wideLinksBox).not.toBeNull();
      expect(wideEditorialBox).not.toBeNull();
      expect(wideMainBox).not.toBeNull();
      expect(
        Math.abs(
          wideMainBox!.y - wideEditorialBox!.y -
            (wideEditorialBox!.y + wideEditorialBox!.height -
              (wideMainBox!.y + wideMainBox!.height)),
        ),
      ).toBeLessThan(16);
      expect(
        wideParagraphBox!.y - (wideTitleBox!.y + wideTitleBox!.height),
      ).toBeGreaterThanOrEqual(44);
      expect(
        wideLinksBox!.y - (wideParagraphBox!.y + wideParagraphBox!.height),
      ).toBeGreaterThanOrEqual(36);
    } else {
      expect(visualBox!.y + visualBox!.height).toBeLessThan(titleBox!.y);
      expect(visualBox!.width).toBeLessThanOrEqual((viewport?.width ?? 0) * 0.92 + 1);
      expect(visualBox!.height).toBeLessThanOrEqual((viewport?.height ?? 0) * 0.58);
    }

    await hero.getByRole("button", { name: /ver slide 2: equipos e insumos/i }).click();
    await expect(hero).toHaveAttribute("data-active-slide", "2");
    await expect(hero.locator(".hero-slide-consulting")).toHaveAttribute("aria-hidden", "true");
    await expect(hero.locator(".hero-slide-equipment")).toHaveAttribute("aria-hidden", "false");
    await expect(
      hero.getByRole("heading", { level: 2, name: /equipos que ponen la productividad/i }),
    ).toBeVisible();
    await expect(
      hero.getByRole("link", { name: /conoce el catálogo/i }),
    ).toHaveAttribute("href", "https://juztmaquinaria.lovable.app/");
    await expect(
      hero.getByRole("img", { name: /motoazada, ahoyador, biotrituradora y transporter/i }),
    ).toBeVisible();
    await expect(hero.locator(".equipment-collage-image")).toHaveAttribute(
      "src",
      /hero-equipos-integrated-v2/,
    );
    const collageBox = await hero.locator(".equipment-collage").boundingBox();
    const equipmentCopyBox = await hero.locator(".equipment-copy").boundingBox();
    await expect(hero.locator(".equipment-copy .micro-label")).toHaveCount(0);
    expect(collageBox).not.toBeNull();
    expect(equipmentCopyBox).not.toBeNull();
    if ((viewport?.width ?? 0) >= 900) {
      expect(collageBox!.x + collageBox!.width).toBeLessThanOrEqual(equipmentCopyBox!.x);
      expect(collageBox!.width).toBeGreaterThan(equipmentCopyBox!.width);
      await expect(hero.locator(".equipment-copy")).toHaveCSS("text-align", "right");
      await expect(hero.locator(".equipment-copy h2")).toHaveCSS("text-align", "right");
      const desktopEquipmentHeroBox = await hero.locator(".equipment-hero").boundingBox();
      const desktopViewportWidth = await page.evaluate(() => window.innerWidth);
      expect(desktopEquipmentHeroBox).not.toBeNull();
      // El slide de equipos va a sangre: el texto queda pegado al borde derecho.
      expect(desktopEquipmentHeroBox!.width / desktopViewportWidth).toBeGreaterThanOrEqual(0.95);
      expect(equipmentCopyBox!.x + equipmentCopyBox!.width).toBeGreaterThan(
        desktopViewportWidth - 72,
      );
    } else {
      expect(collageBox!.y + collageBox!.height).toBeLessThanOrEqual(equipmentCopyBox!.y);
      await expect(hero.locator(".equipment-copy")).toHaveCSS("text-align", "left");
      await expect(hero.locator(".equipment-copy h2")).toHaveCSS("text-align", "left");
    }
    await expect(hero.locator(".equipment-copy h2 > span")).toHaveCount(2);

    if ((viewport?.width ?? 0) >= 900) {
      await page.setViewportSize({ width: 2560, height: 1440 });
      await page.waitForTimeout(300);
      const largeEquipmentHeroBox = await hero.locator(".equipment-hero").boundingBox();
      const largeCollageBox = await hero.locator(".equipment-collage").boundingBox();
      const largeCopyBox = await hero.locator(".equipment-copy").boundingBox();
      const largeViewportWidth = await page.evaluate(() => window.innerWidth);
      expect(largeEquipmentHeroBox).not.toBeNull();
      expect(largeCollageBox).not.toBeNull();
      expect(largeCopyBox).not.toBeNull();
      expect(largeEquipmentHeroBox!.width / largeViewportWidth).toBeGreaterThanOrEqual(0.95);
      expect(largeCollageBox!.width / largeViewportWidth).toBeGreaterThanOrEqual(0.48);
      expect(largeCopyBox!.x - (largeCollageBox!.x + largeCollageBox!.width)).toBeLessThan(100);
      expect(largeCopyBox!.x + largeCopyBox!.width).toBeGreaterThan(largeViewportWidth - 96);
    }
  });

  test("publica Proyectos como página independiente", async ({ page }) => {
    await page.goto("/proyectos");

    await expect(page.getByRole("heading", { level: 1, name: /estrategia que llega/i })).toBeVisible();
    await expect(page.locator(".project-detail")).toHaveCount(3);
    await expect(page.locator(".method-section li")).toHaveCount(4);
    await expect(page.locator(".epsea-section")).toHaveCount(0);
    await expect(page.locator('.project-detail img[src*="project-"]')).toHaveCount(3);
    const projectImages = page.locator(".project-detail img");
    for (let index = 0; index < 3; index += 1) {
      const image = projectImages.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() =>
        image.evaluate((node) =>
          node instanceof HTMLImageElement ? node.naturalWidth : 0,
        ),
      ).toBeGreaterThan(0);
    }
  });

  test("mantiene una jerarquía editorial contenida en pantallas de escritorio", async ({ page }) => {
    await page.setViewportSize({ width: 1903, height: 949 });

    await page.goto("/");
    const statementSize = Number.parseFloat(
      await page.locator(".statement-grid h2").evaluate((node) => getComputedStyle(node).fontSize),
    );
    const heroTitleSize = Number.parseFloat(
      await page.locator(".hero-copy h1").evaluate((node) => getComputedStyle(node).fontSize),
    );
    const epseaCodeSize = Number.parseFloat(
      await page.locator(".epsea-code").evaluate((node) => getComputedStyle(node).fontSize),
    );
    const epseaGridBox = await page.locator(".epsea-grid").boundingBox();
    const epseaCodeBox = await page.locator(".epsea-code").boundingBox();
    const epseaStatementBox = await page.locator(".epsea-statement").boundingBox();
    const footerSize = Number.parseFloat(
      await page.locator(".footer-invitation h2").evaluate((node) => getComputedStyle(node).fontSize),
    );
    const projectLinesTitleSize = Number.parseFloat(
      await page.locator("#project-lines-title").evaluate((node) => getComputedStyle(node).fontSize),
    );
    expect(heroTitleSize).toBeLessThanOrEqual(112);
    expect(epseaCodeSize).toBeLessThanOrEqual(140);
    expect(epseaGridBox).not.toBeNull();
    expect(epseaCodeBox).not.toBeNull();
    expect(epseaStatementBox).not.toBeNull();
    expect(
      epseaStatementBox!.x + epseaStatementBox!.width - epseaCodeBox!.x,
    ).toBeGreaterThanOrEqual(epseaGridBox!.width * 0.78);
    expect(statementSize).toBeLessThanOrEqual(71);
    expect(projectLinesTitleSize).toBeLessThanOrEqual(80);
    expect(footerSize).toBeLessThanOrEqual(68);

    await page.goto("/proyectos");
    const projectTitle = page.locator(".inner-hero h1");
    const projectTitleSize = Number.parseFloat(
      await projectTitle.evaluate((node) => getComputedStyle(node).fontSize),
    );
    const projectTitleBox = await projectTitle.boundingBox();
    const projectLinkBox = await page.locator(".inner-hero .text-link").boundingBox();
    expect(projectTitleSize).toBeLessThanOrEqual(106);
    expect(projectTitleBox).not.toBeNull();
    expect(projectLinkBox).not.toBeNull();
    expect(projectLinkBox!.y + projectLinkBox!.height).toBeLessThan(949);
  });

  test("aplica la escala tipográfica completa en Proyectos y Casos de éxito", async ({ page }) => {
    await page.setViewportSize({ width: 1903, height: 949 });

    await page.goto("/proyectos");
    const projectSectionSizes = await page
      .locator(".project-detail-copy h2, .method-intro h2")
      .evaluateAll((nodes) => nodes.map((node) => Number.parseFloat(getComputedStyle(node).fontSize)));
    expect(projectSectionSizes.every((size) => size <= 64)).toBe(true);
    expect(
      Number.parseFloat(
        await page.locator(".page-bridge h2").evaluate((node) => getComputedStyle(node).fontSize),
      ),
    ).toBeLessThanOrEqual(70);

    await page.goto("/casos-de-exito");
    const casesSectionSizes = await page
      .locator(".cases-impact h2, .case-editorial h2, .cases-note h2")
      .evaluateAll((nodes) => nodes.map((node) => Number.parseFloat(getComputedStyle(node).fontSize)));
    expect(casesSectionSizes.every((size) => size <= 64)).toBe(true);
    expect(
      await page.locator(".cases-hero h1").evaluate((node) => getComputedStyle(node).fontFamily),
    ).toContain("pitagon");
    expect(
      await page.locator(".cases-hero-grid > p:last-child").evaluate(
        (node) => getComputedStyle(node).fontFamily,
      ),
    ).toContain("Hanken Grotesk");
    expect(
      await page.locator(".cases-hero .micro-label").evaluate(
        (node) => getComputedStyle(node).fontFamily,
      ),
    ).toContain("IBM Plex Mono");

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/proyectos");
    const methodBox = await page.locator(".method-section").boundingBox();
    expect(methodBox).not.toBeNull();
    expect(methodBox!.height).toBeLessThanOrEqual(720);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/casos-de-exito");
    const mobileSectionSizes = await page
      .locator(".cases-impact h2, .case-editorial h2, .cases-note h2")
      .evaluateAll((nodes) => nodes.map((node) => Number.parseFloat(getComputedStyle(node).fontSize)));
    expect(mobileSectionSizes.every((size) => size <= 40)).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBe(0);
  });

  test("mantiene el contenido visible cuando se reduce el movimiento", async ({ page }) => {
    for (const path of ["/", "/proyectos", "/casos-de-exito", "/privacidad"]) {
      await page.goto(path);
      const reveals = page.locator("[data-motion-reveal]");
      expect(await reveals.count()).toBeGreaterThan(0);
      expect(
        await reveals.evaluateAll((elements) =>
          elements.every((element) => {
            const style = getComputedStyle(element);
            return style.opacity === "1" && style.visibility !== "hidden";
          }),
        ),
      ).toBe(true);
    }
  });

  test("aplica entradas editoriales solo al entrar en viewport", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");

    const statement = page.locator(".statement-copy");
    await expect(statement).toHaveAttribute("data-motion-stagger", "true");
    await statement.scrollIntoViewIfNeeded();
    await expect(statement.locator("[data-reveal-item]").first()).toHaveCSS("opacity", "1");

    const cards = page.locator(".project-line-grid");
    await expect(cards).toHaveAttribute("data-motion-stagger", "true");
    await cards.scrollIntoViewIfNeeded();
    await expect(cards.locator("[data-reveal-item]").last()).toHaveCSS("opacity", "1", {
      timeout: 10_000,
    });
  });

  test("publica Casos de éxito sin inventar testimonios", async ({ page }) => {
    await page.goto("/casos-de-exito");

    await expect(page.getByRole("heading", { level: 1, name: /resultados que merecen/i })).toBeVisible();
    await expect(page.locator(".cases-impact li")).toHaveCount(4);
    await expect(page.locator(".case-principles article")).toHaveCount(3);
    await expect(page.getByText(/no publicamos nombres, testimonios ni resultados/i)).toBeVisible();
  });

  test("lleva un footer de contacto completo en cada página", async ({ page }) => {
    test.setTimeout(60_000);
    for (const path of ["/", "/proyectos", "/casos-de-exito"]) {
      await page.goto(`${path}#contacto-footer`, { waitUntil: "domcontentloaded" });
      const footer = page.locator("#contacto-footer");
      await expect(footer).toBeVisible();
      await expect(footer.getByText("gerencia@juzt.com.co")).toBeVisible();
      await expect(footer.getByText("+57 311 334 1341")).toBeVisible();
      await expect(footer.getByText(/NIT 901\.767\.156/)).toBeVisible();
      await expect(footer.getByLabel("Nombre")).toBeVisible();
      const footerDescriptor = footer.locator(".logo-footer-descriptor");
      await expect(footerDescriptor).toContainText("Gestión deproductividad");
      await expect(footerDescriptor).toHaveCSS("color", "rgb(255, 255, 255)");
      const footerDivider = footer.locator(".logo-footer-divider");
      await expect(footerDivider).toBeVisible();
      await expect(footerDivider).toHaveCSS("width", "1px");
      expect(
        await footerDivider.evaluate((node) => getComputedStyle(node).backgroundImage),
      ).toContain("linear-gradient");
    }
  });

  test("no presenta desborde horizontal", async ({ page }) => {
    for (const path of ["/", "/proyectos", "/casos-de-exito"]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBe(0);
    }
  });

  test("el menú móvil abre como panel completo", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Comprobación específica móvil");
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menú" }).click();

    const menu = page.locator(".mobile-navigation");
    await expect(menu).toHaveAttribute("data-open", "true");
    await expect(menu.getByRole("link", { name: /casos de éxito/i })).toBeVisible();
    await expect(menu.getByRole("link", { name: /equipos e insumos/i })).toBeVisible();
  });
});

test.describe("Formulario de contacto compartido", () => {
  test("valida los campos requeridos", async ({ page }) => {
    await page.goto("/#contacto-footer");
    await page.getByRole("button", { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/ingresa tu nombre/i)).toBeVisible();
    await expect(page.getByText(/autorizar el tratamiento de datos/i)).toBeVisible();
  });
});
