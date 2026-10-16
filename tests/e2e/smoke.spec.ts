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
    const mobileMenu = page.getByRole("button", { name: "Abrir menú" });
    if (await mobileMenu.isVisible()) await mobileMenu.click();
    await expect(page.getByRole("link", { name: /^(?:\d{2} )?Proyectos$/ }).first()).toHaveAttribute(
      "href",
      "/proyectos",
    );
    await expect(page.getByRole("link", { name: /^(?:\d{2} )?Nosotros$/ }).first()).toHaveAttribute(
      "href",
      "/nosotros",
    );
    await expect(page.getByRole("link", { name: /^(?:\d{2} )?Casos de éxito$/ }).first()).toHaveAttribute(
      "href",
      "/casos-de-exito",
    );
    await expect(page.getByRole("link", { name: /equipos e insumos/i }).first()).toHaveAttribute(
      "href",
      "https://juztmaquinaria.lovable.app/",
    );

    await expect(page.locator(".site-header")).toHaveCSS("background-color", "rgb(25, 33, 71)");
    if ((page.viewportSize()?.width ?? 0) >= 1152) {
      await expect(page.locator(".home-reference-nav a")).toHaveText([
        "Inicio",
        "Nosotros",
        "Proyectos",
        "Casos de éxito",
        "Equipos e insumos",
        "Contactos",
      ]);
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

    const epsea = page.locator(".epsea-section");
    await expect(epsea).toBeVisible();
    await expect(epsea).toHaveCount(1);
    await expect(epsea.getByRole("heading", { name: "EPSEA" })).toBeVisible();
    await expect(epsea).toContainText("Entidad Prestadora del Servicio de Extensión Agropecuaria en Colombia");
    await expect(epsea).toContainText(
      "es una empresa habilitada como EPSEA mediante resolución número 187 de 2026 de la Agencia de Desarrollo Rural (ADR).",
    );
    await expect(epsea.getByRole("button", { name: "Conoce más" })).toHaveAttribute("aria-haspopup", "dialog");
    expect(
      await page.locator(".consulting-hero").evaluate((element) =>
        element.nextElementSibling?.classList.contains("epsea-section"),
      ),
    ).toBe(true);
    await expect(page.locator('[data-home="6"] a[aria-label]')).toHaveCount(3);
    await expect(page.locator(".about-editorial")).toHaveCount(0);
    await expect(page.locator(".difference-section")).toHaveCount(0);
    await expect(page.locator('[data-home="6"]')).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(page.locator('[data-home="6"]')).toHaveCSS("background-color", "rgb(27, 35, 68)");
    expect(
      await page.locator(".epsea-section").evaluate((element) =>
        getComputedStyle(element).backgroundImage,
      ),
    ).not.toBe("none");
    expect(
      await page.locator("#aliados").evaluate((element) =>
        getComputedStyle(element).backgroundImage,
      ),
    ).not.toBe("none");
    const experience = page.locator("#nosotros");
    await expect(experience.locator("video")).toBeVisible();
    await expect(experience.getByRole("heading", { name: "Experiencia que ya dejó huella" })).toBeVisible();
    await expect(experience.locator(".experience-metrics li")).toHaveCount(4);
    await expect(experience.locator(".experience-metrics li")).toHaveText([
      /37municipios atendidos/,
      /1\.510personas impactadas/,
      /8proyectos ejecutados/,
      /21organizaciones acompañadas/,
    ]);
    const allies = page.locator("#aliados");
    await expect(allies.getByRole("img")).toHaveCount(13);
    await expect(allies.getByRole("img", { name: "Infinite 1133" })).toBeVisible();
  });

  test("presenta los trece aliados sin duplicar contenido accesible", async ({ page }) => {
    await page.goto("/#aliados");
    const allies = page.locator("#aliados");
    await expect(allies.getByRole("img")).toHaveCount(13);
    await expect(allies.getByRole("heading")).toHaveText("Relaciones queamplían el impacto.");
    for (const image of await allies.getByRole("img").all()) {
      await expect(image).toBeVisible();
    }
  });

  test("presenta el nuevo bloque EPSEA después de la portada", async ({ page }) => {
    await page.goto("/");
    const epsea = page.locator(".epsea-section");
    await epsea.scrollIntoViewIfNeeded();
    await expect(epsea.locator(".epsea-logo img")).toBeVisible();
    await expect(epsea.locator(".epsea-divider")).toBeVisible();
    await expect(epsea.getByRole("button", { name: "Conoce más" })).toBeVisible();
    await epsea.getByRole("button", { name: "Conoce más" }).click();
    await expect(page.locator(".epsea-dialog")).toBeVisible();
    await expect(page.locator(".epsea-dialog iframe")).toHaveAttribute("src", /resolucion-187-2026-epsea-juzt\.pdf/);
    await page.keyboard.press("Escape");
    await expect(page.locator(".epsea-dialog")).toBeHidden();
  });

  test("reproduce el video sin controles y lo pausa al hacer clic", async ({ page }) => {
    await page.goto("/");
    const experience = page.locator("#nosotros");
    const video = experience.locator("video");
    expect(await video.getAttribute("controls")).toBeNull();
    await expect(video).toHaveAttribute("playsinline", "");
    expect(await video.evaluate((node) => (node as HTMLVideoElement).paused)).toBe(true);
    await video.scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate((node) => !(node as HTMLVideoElement).paused)).toBe(true);

    await experience.getByRole("button", { name: "Pausar video" }).click();
    await expect.poll(() => video.evaluate((node) => (node as HTMLVideoElement).paused)).toBe(true);
    await experience.getByRole("button", { name: "Reproducir video" }).click();
    await expect.poll(() => video.evaluate((node) => !(node as HTMLVideoElement).paused)).toBe(true);
    expect(await video.evaluate((node) => (node as HTMLVideoElement).muted)).toBe(false);
  });

  test("detiene el audio fuera de vista y respeta la pausa manual", async ({ page }) => {
    await page.goto("/");
    const video = page.locator("#nosotros video");
    await video.scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate((node) => !(node as HTMLVideoElement).paused)).toBe(true);

    const scrollToProjects = () => page.evaluate(() =>
      window.scrollTo({
        top: (document.querySelector('[data-home="6"]') as HTMLElement).offsetTop + 100,
        behavior: "instant",
      }),
    );
    const scrollToVideo = () => page.evaluate(() =>
      window.scrollTo({
        top: (document.querySelector("#nosotros") as HTMLElement).offsetTop,
        behavior: "instant",
      }),
    );

    await scrollToProjects();
    await expect.poll(() => video.evaluate((node) => (node as HTMLVideoElement).paused)).toBe(true);

    await scrollToVideo();
    await expect.poll(() => video.evaluate((node) => !(node as HTMLVideoElement).paused)).toBe(true);
    await page.locator(".experience-video-button").click();
    await expect.poll(() => video.evaluate((node) => (node as HTMLVideoElement).paused)).toBe(true);

    await scrollToProjects();
    await scrollToVideo();
    await page.waitForTimeout(150);
    expect(await video.evaluate((node) => (node as HTMLVideoElement).paused)).toBe(true);
  });

  test("mantiene el video a pantalla completa menos la franja de cifras en cualquier tamaño", async ({ page }) => {
    for (const viewport of [
      { width: 320, height: 568 }, { width: 390, height: 844 },
      { width: 844, height: 390 }, { width: 768, height: 1024 },
      { width: 1280, height: 720 }, { width: 1366, height: 768 },
      { width: 1903, height: 991 }, { width: 2560, height: 1440 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const section = page.locator("#nosotros");
      await section.evaluate((element) => window.scrollTo({ top: (element as HTMLElement).offsetTop, behavior: "instant" }));
      const bounds = await section.evaluate((element) => {
        const box = element.getBoundingClientRect();
        const video = element.querySelector(".experience-video-button")!.getBoundingClientRect();
        const stats = element.querySelector(".experience-stats")!.getBoundingClientRect();
        return { top: box.top, bottom: box.bottom, height: box.height,
          videoTop: video.top, videoBottom: video.bottom,
          statsTop: stats.top, statsBottom: stats.bottom,
          previousBottom: element.previousElementSibling!.getBoundingClientRect().bottom,
          nextTop: element.nextElementSibling!.getBoundingClientRect().top,
        };
      });
      const videoOffset = viewport.width <= 640 ? 160 : 180;
      expect(bounds.videoBottom - bounds.videoTop, `${viewport.width}px`).toBeCloseTo(viewport.height - videoOffset, 0);
      expect(bounds.top).toBeCloseTo(0, 0);
      expect(bounds.previousBottom).toBeLessThanOrEqual(1);
      expect(bounds.videoTop).toBeCloseTo(0, 0);
      expect(bounds.statsTop).toBeCloseTo(bounds.videoBottom, 0);
      expect(bounds.nextTop).toBeCloseTo(bounds.statsBottom, 0);
      await expect(section.locator("video")).toHaveCSS("object-fit", "contain");
      expect(await section.locator("h2, li").evaluateAll((nodes) => nodes.filter((node) => node.scrollWidth > node.clientWidth + 1).length)).toBe(0);
    }
  });

  test("cuenta desde cero al aparecer la franja de resultados", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");

    const values = await page.evaluate(async () => {
      const metrics = document.querySelector(".experience-stats");
      const number = metrics?.querySelectorAll("strong")[1];
      if (!metrics || !number) return [];

      const samples = [number.textContent ?? ""];
      const observer = new MutationObserver(() => samples.push(number.textContent ?? ""));
      observer.observe(number, { characterData: true, childList: true, subtree: true });
      metrics.scrollIntoView({ block: "center" });
      await new Promise((resolve) => window.setTimeout(resolve, 1800));
      observer.disconnect();
      return samples;
    });

    expect(values).toContain("0");
    expect(values.some((value) => Number(value.replace(/\D/g, "")) > 0 && value !== "1.510")).toBe(true);
    await expect(page.locator(".experience-metrics strong")).toHaveText(["37", "1.510", "8", "21"]);
  });

  test("presenta un carrusel editorial accesible para consultoría y equipos", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator(".consulting-hero");
    await expect(hero.getByRole("button", { name: "Pausar presentación" })).toHaveCount(0);
    await expect(hero).toHaveAttribute("aria-roledescription", "carrusel");
    await expect(hero.locator(".hero-slider-controls button")).toHaveCount(2);
    await expect(hero.locator(".hero-slider-controls")).toHaveText("");
    await expect(hero).toHaveAttribute("data-active-slide", "1");
    await expect(hero.locator(".hero-slide-consulting")).toHaveAttribute("aria-hidden", "false");
    await expect(hero.locator(".hero-slide-equipment")).toHaveAttribute("aria-hidden", "true");
    await expect(hero.getByRole("img", { name: /productores rurales/ })).toHaveAttribute("src", /home-slide-1-field/);
    await expect(hero.getByRole("link", { name: /hablemos de tu proyecto/i })).toHaveAttribute("href", /wa\.me/);
    await expect(hero.getByRole("link", { name: /conoce nuestros proyectos/i })).toHaveAttribute("href", "/proyectos");
    await hero.getByRole("button", { name: "Ver siguiente slide" }).click();
    await expect(hero).toHaveAttribute("data-active-slide", "2");
    await expect(hero.locator(".hero-slide-consulting")).toHaveAttribute("aria-hidden", "true");
    await expect(hero.locator(".hero-slide-equipment")).toHaveAttribute("aria-hidden", "false");
    await expect(hero.locator(".hero-slide-consulting a").first()).toHaveAttribute("tabindex", "-1");
    await expect(hero.getByRole("link", { name: /conoce nuestro catálogo/i })).toHaveAttribute("href", "https://juztmaquinaria.lovable.app/");
    await expect(hero.getByRole("img", { name: /Trabajadores usando un transporter/i })).toHaveAttribute("src", /home-slide-2-equipment/);
    await hero.getByRole("button", { name: "Ver siguiente slide" }).click();
    await expect(hero).toHaveAttribute("data-active-slide", "1");
    await expect(hero.locator(".hero-slide-consulting a").first()).toHaveAttribute("tabindex", "0");
  });

  test("el carrusel principal cambia cada ocho segundos sin botón de pausa", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.clock.install({ time: new Date("2026-10-02T12:00:00Z") });
    await page.goto("/");
    await page.clock.pauseAt(new Date("2026-10-02T12:01:00Z"));
    const hero = page.locator(".consulting-hero");
    await expect(hero.locator(".hero-slider-pause")).toHaveCount(0);
    await hero.getByRole("button", { name: "Ver siguiente slide" }).click();
    if (await hero.getAttribute("data-active-slide") !== "1") {
      await hero.getByRole("button", { name: "Ver siguiente slide" }).click();
    }
    await page.clock.fastForward(7999);
    await expect(hero).toHaveAttribute("data-active-slide", "1");
    await page.clock.fastForward(1);
    await expect(hero).toHaveAttribute("data-active-slide", "2");
    await page.clock.fastForward(8000);
    await expect(hero).toHaveAttribute("data-active-slide", "1");
  });

  test("publica Proyectos como página independiente", async ({ page }) => {
    await page.goto("/proyectos");
    await expect(page.getByRole("heading", { level: 1, name: /Proyectos y consultoría/i })).toBeVisible();
    await expect(page.locator("#linea-proyectos")).toHaveCount(1);
    await expect(page.locator(".project-detail, .method-section, .epsea-section")).toHaveCount(0);
    await page.locator("#linea-proyectos img").evaluate((node) => (node as HTMLImageElement).decode());
  });

  test("mantiene una jerarquía editorial contenida en pantallas de escritorio", async ({ page }) => {
    await page.setViewportSize({ width: 1903, height: 949 });

    await page.goto("/");
    const experienceTitleSize = Number.parseFloat(
      await page.locator(".experience-stats h2").evaluate((node) => getComputedStyle(node).fontSize),
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
    const projectLinesTitleSize = Number.parseFloat(
      await page.locator("#reform-lines-title").evaluate((node) => getComputedStyle(node).fontSize),
    );
    expect(heroTitleSize).toBeLessThanOrEqual(112);
    expect(epseaCodeSize).toBeLessThanOrEqual(140);
    expect(epseaGridBox).not.toBeNull();
    expect(epseaCodeBox).not.toBeNull();
    expect(epseaStatementBox).not.toBeNull();
    expect(
      epseaStatementBox!.x + epseaStatementBox!.width - epseaCodeBox!.x,
    ).toBeGreaterThanOrEqual(epseaGridBox!.width * 0.78);
    expect(experienceTitleSize).toBeLessThanOrEqual(58);
    expect(projectLinesTitleSize).toBeLessThanOrEqual(100);

    await page.goto("/proyectos");
    const projectTitle = page.locator("#linea-proyectos h1");
    expect(Number.parseFloat(await projectTitle.evaluate((node) => getComputedStyle(node).fontSize))).toBeLessThanOrEqual(106);
    await expect(projectTitle).toBeVisible();
  });

  test("aplica la escala tipográfica completa en Proyectos y Casos de éxito", async ({ page }) => {
    await page.setViewportSize({ width: 1903, height: 949 });

    await page.goto("/proyectos");
    await expect(page.locator("#linea-proyectos h1")).toHaveCSS("font-family", /Pitagon Sans Slide/);
    expect(Number.parseFloat(await page.locator("#linea-proyectos h3").evaluate((node) => getComputedStyle(node).fontSize))).toBeLessThanOrEqual(64);

    await page.goto("/casos-de-exito");
    expect(
      await page.locator("#rutas-turismo h1").evaluate((node) => getComputedStyle(node).fontFamily),
    ).toContain("Pitagon Sans Slide");
    expect(
      await page.locator("#rutas-turismo h1 + p").first().evaluate(
        (node) => getComputedStyle(node).fontFamily,
      ),
    ).toContain("Pitagon Sans Slide");

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/proyectos");
    await expect(page.locator("#linea-proyectos")).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/casos-de-exito");
    await expect(page.locator("#rutas-turismo h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBe(0);
  });

  test("mantiene el contenido visible cuando se reduce el movimiento", async ({ page }) => {
    for (const path of ["/", "/proyectos", "/casos-de-exito", "/privacidad"]) {
      await page.goto(path);
      const reveals = page.locator(path === "/" ? "[data-home]" : path === "/casos-de-exito" ? "#rutas-turismo" : path === "/proyectos" ? "#linea-proyectos" : "[data-motion-reveal]");
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

  test("permite explorar las líneas desde sus tarjetas", async ({ page }) => {
    await page.goto("/");
    await page.locator('#lineas-estrategicas').getByRole("link", { name: "Proyectos y consultoría", exact: true }).click();
    await expect(page).toHaveURL(/\/proyectos#linea-proyectos$/);
    await expect(page.locator("#linea-proyectos h1")).toBeVisible();
    await page.goto("/");
    await page.locator('#lineas-estrategicas').getByRole("link", { name: "Equipos, insumos y tecnología", exact: true }).click();
    await expect(page).toHaveURL(/\/proyectos#linea-equipos$/);
    await expect(page.locator("#linea-equipos h2")).toBeVisible();
  });

  test("publica los casos de éxito con ventana de detalle", async ({ page }) => {
    await page.goto("/casos-de-exito");

    await expect(page.getByRole("heading", { level: 1, name: /Experiencia que se siente en el territorio/i })).toBeVisible();
    await expect(page.locator("#historias-territorio article")).toHaveCount(6);

    const card = page.locator("#historias-territorio article").first();
    await expect(card.getByRole("heading", { level: 3 })).toContainText("Tecnificación ganadera en San Luis");
    await expect(card.getByText("Resultado: 43 unidades productivas ganaderas beneficiadas.")).toBeHidden();

    await card.getByRole("button", { name: /Conoce más sobre Tecnificación ganadera/i }).click();
    const dialog = page.getByRole("dialog", { name: /Tecnificación ganadera en San Luis/i });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Resultado: 43 unidades productivas ganaderas beneficiadas.")).toBeVisible();
    await dialog.getByRole("button", { name: "Cerrar" }).click();
    await expect(dialog).toBeHidden();
  });

  test("lleva un footer de contacto completo en cada página", async ({ page }) => {
    test.setTimeout(60_000);
    let baseline: unknown;
    for (const path of ["/", "/nosotros", "/proyectos", "/equipos-e-insumos", "/gestion-financiera", "/casos-de-exito", "/privacidad"]) {
      await page.goto(`${path}#contacto-footer`, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const footer = page.locator("#contacto-footer");
      await expect(footer).toHaveCount(1);
      await expect(footer.getByText("gerencia@juzt.com.co")).toBeVisible();
      await expect(footer.getByText("+57 311 334 1341")).toBeVisible();
      await expect(footer.getByText(/Nit:? 901\.767\.156/i)).toBeVisible();
      await expect(footer.getByLabel("Nombre", { exact: true })).toBeVisible();
      const form = await footer.evaluate((node) => ({
        background: getComputedStyle(node).backgroundColor,
        fields: [...node.querySelectorAll("input:not([type='checkbox']), textarea")].map((field) => ({
          placeholder: field.getAttribute("placeholder"),
          border: getComputedStyle(field).borderRadius,
          font: getComputedStyle(field).fontSize,
        })),
      }));
      baseline ??= form;
      expect(form, path).toEqual(baseline);
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
