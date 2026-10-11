import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const baseURL = process.argv[2] || process.env.SITE_URL || "http://127.0.0.1:3000";
const routes = ["/", "/about-us", "/care-services", "/care-services/residential", "/care-services/dementia", "/care-services/nursing", "/care-services/respite", "/facilities", "/fees", "/gallery", "/reviews", "/contact", "/privacy", "/cookies", "/terms", "/accessibility"];
const widths = [360, 390, 768, 1440];
const interactionsOnly = process.argv.includes("--interactions-only");
const report = interactionsOnly ? JSON.parse(await readFile("reports/generated/verification.json", "utf8")) : { layouts: [], checks: [], contrast: {} };
report.checks = [];
const browser = await chromium.launch();
const errors = [];
await mkdir("reports/generated", { recursive: true });

try {
  const page = await browser.newPage();
  page.on("pageerror", error => errors.push(error.message));
  for (const width of interactionsOnly ? [] : widths) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      const response = await page.goto(baseURL + route, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, route);
      await page.evaluate(async () => {
        await document.fonts.ready;
        // Load below-fold photos before a full-page capture.
        for (const img of document.querySelectorAll("main img")) img.loading = "eager";
        await Promise.all([...document.querySelectorAll("main img")].map(img => img.decode().catch(() => {})));
      });
      assert.equal(await page.locator("h1").count(), 1, `One h1: ${route}`);
      const measurements = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        brokenImages: [...document.querySelectorAll("main img")].filter(img => !img.complete || !img.naturalWidth).map(img => img.src),
        targets: [...document.querySelectorAll(".public-site a, .public-site button, .public-site summary")].filter(el => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height < 43.5).map(el => el.textContent),
        smallBody: [...document.querySelectorAll("main p:not(.eyebrow):not(.pending-note):not(.form-footnote):not(.field-error), main blockquote")].filter(el => !el.closest("figcaption, .map-placeholder, .enquiry-form") && parseFloat(getComputedStyle(el).fontSize) < 16).map(el => el.textContent)
      }));
      const lowContrast = await page.evaluate(() => {
        const rgb = value => value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
        const luminance = values => values.map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((total, value, index) => total + value * [.2126, .7152, .0722][index], 0);
        const failures = [];
        const walker = document.createTreeWalker(document.querySelector(".public-site"), NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          if (!node.textContent.trim()) continue;
          const el = node.parentElement;
          if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
          const style = getComputedStyle(el);
          const fg = rgb(style.color);
          let surface = el;
          while (surface && getComputedStyle(surface).backgroundColor === "rgba(0, 0, 0, 0)") surface = surface.parentElement;
          const bg = surface ? rgb(getComputedStyle(surface).backgroundColor) : [255, 255, 255];
          if (!fg || !bg) continue;
          const a = luminance(fg), b = luminance(bg);
          const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
          const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight) >= 700);
          if (ratio < (large ? 3 : 4.5)) failures.push({ text: node.textContent.trim(), ratio: Number(ratio.toFixed(2)), fg: style.color, bg: getComputedStyle(surface).backgroundColor });
        }
        return failures;
      });
      assert.deepEqual(lowContrast, [], `Rendered text contrast: ${width} ${route}`);
      assert.equal(measurements.overflow, false, `Overflow: ${width} ${route}`);
      assert.deepEqual(measurements.brokenImages, [], `Broken images: ${route}`);
      assert.deepEqual(measurements.targets, [], `Small targets: ${width} ${route}`);
      assert.deepEqual(measurements.smallBody, [], `Small body text: ${width} ${route}`);
      const file = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${width}.png`;
      await page.screenshot({ path: `reports/generated/${file}`, fullPage: true });
      report.layouts.push({ route, width, screenshot: file });
    }
    console.log(`Layouts and screenshots passed at ${width}px (${routes.length} routes).`);
  }
  await writeFile("reports/generated/verification.json", JSON.stringify(report, null, 2) + "\n");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL);
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(":focus").textContent(), "Skip to main content");
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(":focus").getAttribute("id"), "main-content");
  const menu = page.locator(".mobile-menu summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(".mobile-menu").getAttribute("open"), "");
  await page.keyboard.press("Tab");
  const focus = await page.locator(":focus").evaluate(el => getComputedStyle(el).outlineWidth);
  assert.equal(focus, "2px");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".mobile-menu").getAttribute("open"), null);
  assert.equal(await menu.evaluate(el => el === document.activeElement), true);
  await menu.click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Our homes", exact: true }).click();
  assert.equal(await page.locator(".mobile-menu").getAttribute("open"), null);
  report.checks.push("Skip link, keyboard focus, mobile menu, Escape and navigation");
  console.log("Keyboard and mobile navigation passed.");

  await page.goto(baseURL + "/gallery");
  const photo = page.getByRole("link", { name: "Enlarge light-filled living spaces" });
  await photo.click();
  assert.equal(await page.locator("dialog").evaluate(el => el.open), true);
  assert.equal(await page.getByRole("button", { name: "Close photograph" }).evaluate(el => el === document.activeElement), true);
  await page.keyboard.press("Tab");
  // Native dialogs may let Tab reach browser chrome; the underlying document remains inert.
  assert.equal(await page.evaluate(() => document.activeElement === document.body || Boolean(document.activeElement?.closest("dialog"))), true);
  assert.equal(await page.locator(".site-header .brand").evaluate(el => { el.focus(); return el === document.activeElement; }), false);
  await page.getByRole("button", { name: "Close photograph" }).focus();
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("dialog").evaluate(el => el.open), false);
  assert.equal(await photo.evaluate(el => el === document.activeElement), true);
  await photo.click();
  await page.getByRole("button", { name: "Close photograph" }).click();
  assert.equal(await page.locator("dialog").evaluate(el => el.open), false);
  report.checks.push("Lightbox open, focus containment, Escape, close and focus restoration");
  console.log("Lightbox interactions passed.");

  await page.goto(baseURL + "/contact");
  const submissions = [];
  page.on("request", request => { if (["POST", "PUT", "PATCH"].includes(request.method())) submissions.push(request.url()); });
  await page.getByRole("button", { name: "Prepare enquiry" }).click();
  assert.equal(await page.locator(".field-error").count(), 2);
  assert.equal(await page.locator(".error-summary").evaluate(el => el === document.activeElement), true);
  await page.locator("#full-name").fill("   ");
  await page.locator("#email").fill("not-an-email");
  await page.getByRole("button", { name: "Prepare enquiry" }).click();
  assert.equal(await page.locator(".field-error").count(), 2);
  await page.locator("#full-name").fill("Preview Visitor");
  await page.locator("#email").fill("visitor@example.com");
  await page.getByRole("button", { name: "Prepare enquiry" }).click();
  assert.equal(await page.getByRole("status").textContent(), "The required fields are complete. This is a preview; no enquiry has been sent or saved.");
  assert.deepEqual(submissions, []);
  await page.locator("#full-name").fill("");
  assert.equal(await page.getByRole("status").count(), 0);
  report.checks.push("Empty, whitespace, invalid-email and valid form input; no transmission");
  console.log("Preview form validation passed.");

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseURL);
  const card = page.locator(".care-card").first();
  await card.hover();
  await page.waitForTimeout(300);
  assert.equal(await card.evaluate(el => getComputedStyle(el).transform), "none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await card.evaluate(el => getComputedStyle(el).transform), "none");
  assert.equal(await card.evaluate(el => getComputedStyle(el).transitionDuration), "0s");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const touchPage = await touch.newPage();
  await touchPage.goto(baseURL);
  await touchPage.locator(".care-card").first().tap();
  assert.equal(await touchPage.locator(".care-card").first().evaluate(el => getComputedStyle(el).transform), "none");
  await touch.close();
  report.checks.push("Fine-pointer card hover, touch and reduced motion");

  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const staticPage = await noJS.newPage();
  for (const route of routes) {
    await staticPage.goto(baseURL + route);
    assert.equal(await staticPage.locator("h1").isVisible(), true, route);
    assert.equal(await staticPage.locator("main").evaluate(el => getComputedStyle(el).opacity), "1");
  }
  await staticPage.goto(baseURL);
  const trust = await staticPage.locator(".trust-status").boundingBox();
  assert.ok(trust.y + trust.height < 844, "Trust information above mobile fold");
  await staticPage.locator(".mobile-menu summary").click();
  assert.equal(await staticPage.getByRole("navigation", { name: "Mobile navigation" }).isVisible(), true);
  await staticPage.goto(baseURL + "/gallery");
  assert.equal(await staticPage.getByRole("link", { name: "Enlarge light-filled living spaces" }).getAttribute("href"), "/images/lounge.jpg");
  await staticPage.goto(baseURL + "/contact");
  assert.equal(await staticPage.getByRole("button", { name: "Prepare enquiry" }).isDisabled(), true);
  await noJS.close();
  report.checks.push("All public pages without JavaScript; native menu, image links, safe preview form and above-fold trust");

  function luminance(hex) {
    const rgb = hex.match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
  }
  function contrast(fg, bg) { const a = luminance(fg), b = luminance(bg); return (Math.max(a, b) + .05) / (Math.min(a, b) + .05); }
  for (const [name, fg, bg, minimum] of [["Heading on parchment", "191b1d", "f1eee6", 4.5], ["Body on paper", "5b5f5d", "fbfaf6", 4.5], ["Body on linen", "5b5f5d", "e9e6de", 4.5], ["Signal blue on paper", "3152b3", "fbfaf6", 4.5], ["Signal blue on linen", "3152b3", "e9e6de", 4.5], ["Footer body", "fbfaf6", "383a4d", 4.5], ["Form errors", "9a2525", "fbfaf6", 4.5]]) {
    const ratio = contrast(fg, bg);
    assert.ok(ratio >= minimum, `${name}: ${ratio}`);
    report.contrast[name] = Number(ratio.toFixed(2));
  }
  report.checks.push("AA text and button/error contrast");

  const admin = await browser.newPage();
  await admin.goto(baseURL + "/admin/dashboard");
  assert.ok(admin.url().endsWith("/admin/login"));
  await admin.getByLabel("Password").fill("incorrect");
  await admin.getByRole("button", { name: "Sign In" }).click();
  await admin.getByText("Password not recognised.").waitFor();
  await admin.getByLabel("Password").fill(process.env.ADMIN_PASSWORD || "ChangeMeBankHouse!");
  await admin.getByRole("button", { name: "Sign In" }).click();
  await admin.waitForURL("**/admin/dashboard");
  assert.equal(await admin.getByRole("heading", { name: "Bank House Operations" }).isVisible(), true);
  const fonts = await admin.locator("h1").evaluate(el => getComputedStyle(el).fontFamily);
  assert.ok(!fonts.includes("lora"), "Admin styling isolated");
  await admin.getByRole("button", { name: "Sign out" }).click();
  await admin.waitForURL("**/admin/login");
  await admin.goto(baseURL + "/admin/dashboard");
  assert.ok(admin.url().endsWith("/admin/login"));
  report.checks.push("Admin redirect, invalid login, valid login, dashboard, style isolation and logout");
  assert.deepEqual(errors, [], "No browser runtime errors");
  await writeFile("reports/generated/verification.json", JSON.stringify(report, null, 2) + "\n");
  console.log(`PASS: ${report.layouts.length} layouts, ${report.checks.length} interaction groups. See reports/generated/verification.json.`);
} finally {
  await browser.close();
}
