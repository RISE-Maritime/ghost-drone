/**
 * Shared test utilities for Playwright E2E tests.
 *
 * These helpers inject fake sim_frame and manual_setpoint data into the page
 * via the zenoh subscription callbacks, allowing tests to run without a live
 * backend.
 */

import type { Page } from "@playwright/test";

/** Minimal sim_frame shape matching the backend's JSON output. */
export interface FakeSimFrame {
  lat?: number;
  lng?: number;
  heading?: number;
  speed?: number;
  state?: string;
  roll?: number;
  pitch?: number;
  rudder_deg?: number;
  thrust_pct?: number;
  operation_mode?: string;
  entity_id?: string;
  health?: {
    level: string;
    mode: string;
    subsystems: { name: string; level: string; detail: string }[];
  };
}

const DEFAULT_FRAME: FakeSimFrame = {
  lat: 57.706,
  lng: 11.938,
  heading: 0,
  speed: 0,
  state: "stopped",
  roll: 0,
  pitch: 0,
  rudder_deg: 0,
  thrust_pct: 0,
  operation_mode: "autonomous",
  entity_id: "sim001",
};

/**
 * Inject a sim_frame into the page by calling the global test hook.
 * The frontend must expose `window.__testInjectFrame(frame)` for this to work.
 * We use page.evaluate to call the onTelemetryFrame function directly.
 */
export async function injectSimFrame(
  page: Page,
  overrides: Partial<FakeSimFrame> = {},
): Promise<void> {
  const frame = { ...DEFAULT_FRAME, ...overrides };
  await page.evaluate((f) => {
    // Dispatch a custom event that the test harness in the page listens for
    window.dispatchEvent(
      new CustomEvent("__test_sim_frame", { detail: f }),
    );
  }, frame);
}

/**
 * Click the mode toggle button to switch between AUTO and MANUAL.
 */
export async function clickModeToggle(page: Page): Promise<void> {
  await page.click("#btn-mode");
}

/**
 * Wait for the page to be fully loaded and the app to initialize.
 */
export async function waitForAppReady(page: Page): Promise<void> {
  await page.goto("/");
  // Wait for the key UI elements to be present
  await page.waitForSelector("#btn-mode", { state: "attached" });
  await page.waitForSelector("#gauge-heading", { state: "attached" });
}

/**
 * Press a key and release it.
 */
export async function pressKey(page: Page, key: string): Promise<void> {
  await page.keyboard.press(key);
}

/**
 * Hold a key down (without releasing).
 */
export async function keyDown(page: Page, key: string): Promise<void> {
  await page.keyboard.down(key);
}

/**
 * Release a held key.
 */
export async function keyUp(page: Page, key: string): Promise<void> {
  await page.keyboard.up(key);
}

/**
 * Get the text content of an element, trimmed.
 */
export async function getText(page: Page, selector: string): Promise<string> {
  const el = page.locator(selector);
  return (await el.textContent()) ?? "";
}

/**
 * Check if an element has a specific CSS class.
 */
export async function hasClass(
  page: Page,
  selector: string,
  className: string,
): Promise<boolean> {
  return page.locator(selector).evaluate(
    (el, cls) => el.classList.contains(cls),
    className,
  );
}

/**
 * Get the value of an SVG transform attribute.
 */
export async function getTransform(
  page: Page,
  selector: string,
): Promise<string> {
  return (
    (await page.locator(selector).getAttribute("transform")) ?? ""
  );
}

/**
 * Get computed style property value.
 */
export async function getStyle(
  page: Page,
  selector: string,
  prop: string,
): Promise<string> {
  return page.locator(selector).evaluate(
    (el, p) => (el as HTMLElement).style.getPropertyValue(p),
    prop,
  );
}
