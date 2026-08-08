import { test, expect } from "@playwright/test";

// Determinismo: desactiva preloader, smooth-scroll y animaciones.
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test.describe("Home", () => {
  test("carga con el titular y la navegación", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /productividad agroalimentaria/i }),
    ).toBeVisible();
    if ((page.viewportSize()?.width ?? 1280) >= 1024) {
      await expect(
        page.getByRole("navigation", { name: /principal/i }),
      ).toBeVisible();
    } else {
      await expect(
        page.getByRole("button", { name: /abrir menú/i }),
      ).toBeVisible();
    }
    await expect(page.getByTestId("navbar-logo")).toHaveAttribute("aria-hidden", "true");
    await expect(page.getByTestId("navbar-logo")).toHaveCSS("opacity", "0");
  });

  test("muestra el logo cuando el navbar adopta el fondo claro", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    const logo = page.getByTestId("navbar-logo");

    await expect(logo).toHaveAttribute("aria-hidden", "true");
    await expect(logo).toHaveCSS("opacity", "0");
    await page.evaluate(() => {
      const services = document.getElementById("servicios");
      window.scrollTo(0, services?.offsetTop ?? window.innerHeight);
    });

    await expect(header).toHaveClass(/bg-\[color-mix/);
    await expect(logo).toHaveAttribute("aria-hidden", "false");
    await expect(logo).toHaveCSS("opacity", "1");
  });

  test("oculta el navbar al bajar y lo muestra al subir", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");

    await expect(header).toHaveAttribute("data-hidden", "false");

    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    await expect(header).toHaveAttribute("data-hidden", "true");

    await page.evaluate(() => window.scrollTo(0, window.scrollY - 180));
    await expect(header).toHaveAttribute("data-hidden", "false");

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toHaveAttribute("data-hidden", "false");
  });

  test("los servicios siguen al hero en tres paneles editoriales", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".hero-services-stack > #top + #servicios")).toHaveCount(1);
    await expect(page.locator("#servicios .services-intro")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { level: 2, name: "Nuestros servicios" }),
    ).toHaveCount(1);
    await expect(
      page.getByRole("link", { name: "Descubrir servicios" }),
    ).toHaveCount(1);
    await expect(page.locator("[data-service-panel]")).toHaveCount(3);
    await expect(page.locator("#servicios .service-item")).toHaveCount(6);
    await expect(page.locator("#servicios .service-quality-seal")).toHaveCount(6);
    await expect(
      page.locator("#servicios .service-quality-seal-copy"),
    ).toHaveCount(6);
    await expect(
      page.locator("#servicios .service-scene-meta, #servicios .service-index"),
    ).toHaveCount(0);
    await expect(
      page.locator("#servicios .service-quality-seal-image"),
    ).toHaveCount(5);
    await expect(
      page.locator("#servicios .service-quality-seal-institutional"),
    ).toHaveCount(1);

    const firstSceneSealTops = await page
      .locator("[data-service-panel]")
      .first()
      .locator(".service-quality-seal")
      .evaluateAll((seals) =>
        seals.map((seal) => Math.round(seal.getBoundingClientRect().top)),
      );
    if ((page.viewportSize()?.width ?? 1280) >= 640) {
      expect(
        Math.abs(firstSceneSealTops[0]! - firstSceneSealTops[1]!),
      ).toBeLessThanOrEqual(1);
    }

    await expect(
      page.getByRole("heading", {
        level: 4,
        name: "Gestión Administrativa y de negocios",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Gestionamos desde la estructuración y facilitamos la consecución de créditos agropecuarios.",
        { exact: true },
      ),
    ).toBeVisible();
  });

  test("oculta el contenido del hero antes de revelar la portada de servicios", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.addInitScript(() => sessionStorage.setItem("juzt:seen", "1"));
    await page.goto("/");

    await page.evaluate(() => {
      const intro = document.querySelector<HTMLElement>(".services-intro");
      const introTop = intro
        ? intro.getBoundingClientRect().top + window.scrollY
        : window.innerHeight;
      window.scrollTo(0, introTop - window.innerHeight * 0.65);
    });

    await expect(page.locator("#hero-brand")).toHaveCSS("opacity", "0");
    await expect(page.locator(".services-intro-copy")).not.toHaveCSS(
      "opacity",
      "0",
    );
  });

  test("el hero queda detrás y los paneles se superponen con el scroll", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.addInitScript(() => sessionStorage.setItem("juzt:seen", "1"));
    await page.goto("/");

    const panels = page.locator("[data-service-panel]");
    await expect(page.locator("#top")).toHaveCSS("position", "sticky");
    await expect(panels.first()).toHaveCSS("position", "sticky");

    await page.evaluate(() => {
      const secondPanel = document.querySelectorAll<HTMLElement>(
        "[data-service-panel]",
      )[1];
      const documentTop = secondPanel
        ? secondPanel.getBoundingClientRect().top + window.scrollY
        : window.innerHeight * 2;
      window.scrollTo(0, documentTop);
    });

    await expect
      .poll(() =>
        page.evaluate(
          () =>
            Math.abs(
              Math.round(
                document
                  .querySelectorAll("[data-service-panel]")[1]
                  ?.getBoundingClientRect().top ?? -1,
              ),
            ),
        ),
      )
      .toBeLessThanOrEqual(12);

    await expect
      .poll(() =>
        page.evaluate(() => {
          const allPanels = [
            ...document.querySelectorAll("[data-service-panel]"),
          ];
          const visiblePanel = document
            .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
            ?.closest("[data-service-panel]");
          return allPanels.indexOf(visiblePanel as Element) + 1;
        }),
      )
      .toBe(2);
  });

  test("mantiene la narrativa superpuesta en portátiles de poca altura", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1260, height: 632 });
    await page.addInitScript(() => sessionStorage.setItem("juzt:seen", "1"));
    await page.goto("/");

    await expect(page.locator("#top")).toHaveCSS("position", "sticky");
    await expect(page.locator("[data-service-panel]").first()).toHaveCSS(
      "position",
      "sticky",
    );

    const dimensions = await page
      .locator("[data-service-panel]")
      .first()
      .evaluate((panel) => ({
        panel: Math.round(panel.getBoundingClientRect().height),
        viewport: window.innerHeight,
        shell: Math.round(
          Number.parseFloat(
            getComputedStyle(
              panel.querySelector("[data-service-shell]") as HTMLElement,
            ).height,
          ),
        ),
      }));

    expect(dimensions.panel).toBe(dimensions.viewport);
    expect(dimensions.shell).toBe(dimensions.viewport);

    await page.evaluate(() => {
      const panel = document.querySelector<HTMLElement>("[data-service-panel]");
      const documentTop = panel
        ? panel.getBoundingClientRect().top + window.scrollY
        : window.innerHeight;
      window.scrollTo(0, documentTop);
    });

    await expect
      .poll(() =>
        page
          .locator("[data-service-panel]")
          .first()
          .evaluate((panel) => {
            const content = panel.querySelector<HTMLElement>(".service-content");
            const lastItem = panel.querySelector<HTMLElement>(
              ".service-list .service-item:last-child",
            );
            if (!content || !lastItem) return false;

            return (
              content.scrollHeight === content.clientHeight &&
              lastItem.getBoundingClientRect().bottom <=
                content.getBoundingClientRect().bottom + 1
            );
          }),
      )
      .toBe(true);
  });

  test("muestra completo el propósito en portátiles de poca altura", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1260, height: 632 });
    await page.goto("/");

    const dimensions = await page.locator("#nosotros").evaluate((section) => {
      const sectionRect = section.getBoundingClientRect();
      const imageRect = section
        .querySelector(".purpose-image")
        ?.getBoundingClientRect();
      const contentRect = section
        .querySelector(".purpose-content")
        ?.getBoundingClientRect();

      return {
        sectionHeight: Math.round(sectionRect.height),
        viewportHeight: window.innerHeight,
        imageInside:
          !!imageRect &&
          imageRect.top >= sectionRect.top - 1 &&
          imageRect.bottom <= sectionRect.bottom + 1,
        contentInside:
          !!contentRect &&
          contentRect.top >= sectionRect.top - 1 &&
          contentRect.bottom <= sectionRect.bottom + 1,
      };
    });

    expect(dimensions.sectionHeight).toBe(dimensions.viewportHeight);
    expect(dimensions.imageInside).toBe(true);
    expect(dimensions.contentInside).toBe(true);
  });

  test("las secciones principales existen", async ({ page }) => {
    await page.goto("/");
    for (const id of [
      "nosotros",
      "servicios",
      "principios",
      "aliados",
      "oportunidades",
      "contacto",
    ]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    await expect(page.locator("#diferenciales")).toHaveCount(0);
  });

  test("muestra los aliados sin la fotografía del campo", async ({ page }) => {
    await page.goto("/#aliados");

    await expect(page.locator("#aliados img")).toHaveCount(6);
    await expect(
      page.locator('#aliados img[src*="parcelas-aereas"]'),
    ).toHaveCount(0);
  });

  test("presenta los cuatro principios como una secuencia editorial", async ({
    page,
  }) => {
    await page.goto("/#principios");

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Nuestros principios",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.locator("#principios .principle-item")).toHaveCount(4);
    await expect(
      page.locator("#principios .principle-item").first(),
    ).toContainText("Vínculos de lealtad");
    await expect(
      page.locator("#principios .principle-item").last(),
    ).toContainText("Rentable consciente");
  });

  test("mantiene alineados los principios sin desbordes", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/#principios");

    const layout = await page.locator("#principios").evaluate((section) => {
      const items = [
        ...section.querySelectorAll<HTMLElement>(".principle-item"),
      ];
      const copyCenterOffsets = items.map((item) => {
        const itemRect = item.getBoundingClientRect();
        const copyRect = item
          .querySelector<HTMLElement>(".principle-copy")!
          .getBoundingClientRect();

        return Math.abs(
          copyRect.left + copyRect.width / 2 -
            (itemRect.left + itemRect.width / 2),
        );
      });

      return {
        copyCenterOffsets,
        contentOutside: items.some((item) => {
          const itemRect = item.getBoundingClientRect();
          return [...item.children].some((child) => {
            const childRect = child.getBoundingClientRect();
            return (
              childRect.left < itemRect.left - 1 ||
              childRect.right > itemRect.right + 1
            );
          });
        }),
      };
    });

    expect(Math.max(...layout.copyCenterOffsets)).toBeLessThanOrEqual(1);
    expect(layout.contentOutside).toBe(false);
  });

  test("muestra todos los principios dentro de una sola pantalla", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 1892, height: 955 },
      { width: 1260, height: 632 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await page.locator("#principios").evaluate((section) => {
        window.scrollTo(0, (section as HTMLElement).offsetTop);
      });

      const dimensions = await page.locator("#principios").evaluate((section) => {
        const sectionRect = section.getBoundingClientRect();
        const list = section.querySelector<HTMLElement>(".principles-list");
        const lastItem = section.querySelector<HTMLElement>(
          ".principle-item:last-child",
        );
        const orbits = [
          ...section.querySelectorAll<HTMLElement>(".principle-orbit"),
        ];
        const title = section.querySelector<HTMLElement>(".principles-title");

        return {
          sectionHeight: Math.round(sectionRect.height),
          viewportHeight: window.innerHeight,
          listFits: !!list && list.scrollHeight <= list.clientHeight + 1,
          lastItemFits:
            !!lastItem &&
            lastItem.getBoundingClientRect().bottom <= sectionRect.bottom + 1,
          orbitsFit:
            orbits.length === 4 &&
            orbits.every(
              (orbit) =>
                orbit.getBoundingClientRect().bottom <= sectionRect.bottom + 1,
            ),
          titleFits:
            !!title && title.getBoundingClientRect().top >= sectionRect.top - 1,
        };
      });

      expect(dimensions.sectionHeight).toBe(dimensions.viewportHeight);
      expect(dimensions.listFits).toBe(true);
      expect(dimensions.lastItemFits).toBe(true);
      expect(dimensions.orbitsFit).toBe(true);
      expect(dimensions.titleFits).toBe(true);
    }
  });

  test("anima los círculos sin mover los números", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/#principios");

    await expect(page.locator(".principle-orbit")).toHaveCount(4);
    await expect(
      page.locator(".principle-orbit-artwork-ring").first(),
    ).toHaveCSS("animation-name", "principle-icon-orbit");
    await expect(page.locator(".principle-orbit-halo").first()).toHaveCSS(
      "animation-name",
      "principle-halo-orbit",
    );
    await expect(
      page.locator(".principle-orbit-artwork-number").first(),
    ).toHaveCSS(
      "transform",
      "none",
    );
  });

  test("muestra completo el contacto en portátiles de poca altura", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1260, height: 632 });
    await page.goto("/");
    await page.locator("#contacto").evaluate((section) => {
      window.scrollTo(0, (section as HTMLElement).offsetTop);
    });

    const dimensions = await page.locator("#contacto").evaluate((section) => {
      const sectionRect = section.getBoundingClientRect();
      const cardRect = section
        .querySelector<HTMLElement>(".contact-card")
        ?.getBoundingClientRect();
      const submitRect = section
        .querySelector<HTMLElement>(".contact-submit")
        ?.getBoundingClientRect();
      const lastContactRect = section
        .querySelector<HTMLElement>(".contact-row:last-child")
        ?.getBoundingClientRect();

      return {
        sectionHeight: Math.round(sectionRect.height),
        viewportHeight: window.innerHeight,
        cardFits:
          !!cardRect &&
          cardRect.top >= sectionRect.top - 1 &&
          cardRect.bottom <= sectionRect.bottom + 1,
        submitFits:
          !!submitRect && submitRect.bottom <= sectionRect.bottom + 1,
        contactDetailsFit:
          !!lastContactRect &&
          lastContactRect.bottom <= sectionRect.bottom + 1,
      };
    });

    expect(dimensions.sectionHeight).toBe(dimensions.viewportHeight);
    expect(dimensions.cardFits).toBe(true);
    expect(dimensions.submitFits).toBe(true);
    expect(dimensions.contactDetailsFit).toBe(true);
  });

  test("el enlace de saltar al contenido es accesible", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /saltar al contenido/i })).toBeFocused();
  });
});

test.describe("Formulario de contacto", () => {
  test("valida campos requeridos", async ({ page }) => {
    await page.goto("/#contacto");
    await page.getByRole("button", { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/ingresa tu nombre/i)).toBeVisible();
    await expect(page.getByText(/autorizar el tratamiento de datos/i)).toBeVisible();
  });

  test("acepta un envío válido", async ({ page }) => {
    await page.goto("/#contacto");
    await page.getByLabel("Nombre").fill("María Gómez");
    await page.getByLabel("Correo").fill("maria@example.com");
    await page.getByLabel("Teléfono").fill("3001234567");
    await page.getByLabel("Mensaje").fill("Necesito asesoría para un proyecto agropecuario en Antioquia.");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: /enviar mensaje/i }).click();
    await expect(page.getByText(/recibimos tu solicitud/i)).toBeVisible();
  });
});
