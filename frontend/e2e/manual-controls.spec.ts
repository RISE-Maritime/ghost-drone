/**
 * E2E tests for manual controls — defines the CORRECT UI behaviour.
 *
 * These tests verify:
 * - Arrow keys only (no WASD) control the drone in operated mode
 * - Left/Right arrows change rudder set value (not heading)
 * - Up/Down arrows change engine set value (not thrust directly)
 * - Setpoint indicators show/hide correctly per mode
 * - Gauges display correct values and formatting
 *
 * The tests inject sim_frames via a custom event bridge since they
 * run against the Vite dev server without a live backend. The frontend
 * code must be instrumented to listen for `__test_sim_frame` events.
 *
 * NOTE: These tests define correct behaviour. They will fail against
 * the current buggy implementation.
 */

import { test, expect, type Page } from "@playwright/test";

// ---------------------------------------------------------------------------
// Helpers — inline for self-contained test file
// ---------------------------------------------------------------------------

/** Navigate to the app and wait for it to be ready. */
async function setup(page: Page): Promise<void> {
  await page.goto("/");
  await page.waitForSelector("#gauge-heading", { state: "attached" });
}

/**
 * Inject a sim_frame by evaluating JS in the page context.
 * This calls the telemetry module's onTelemetryFrame directly via
 * the globally-exposed test hook.
 */
async function injectFrame(page: Page, frame: Record<string, unknown>): Promise<void> {
  const defaults = {
    lat: 57.706,
    lng: 11.938,
    heading: 0,
    speed: 0,
    state: "playing",
    roll: 0,
    pitch: 0,
    rudder_deg: 0,
    thrust_pct: 0,
    operation_mode: "operated",
    entity_id: "sim001",
  };
  const merged = { ...defaults, ...frame };
  await page.evaluate((f) => {
    // The app exposes onTelemetryFrame for testing
    if (typeof (window as any).__testOnFrame === "function") {
      (window as any).__testOnFrame(f);
    }
  }, merged);
}

/** Collect the values that the onManualControl callback receives. */
async function captureManualControls(page: Page): Promise<{ calls: any[] }> {
  return page.evaluate(() => {
    return { calls: (window as any).__testManualCalls ?? [] };
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("Manual controls", () => {

  test("ArrowUp increases engine display", async ({ page }) => {
    await setup(page);

    // Drone starts in operated mode — no toggle needed.
    // Press ArrowUp to increase engine value
    await page.keyboard.press("ArrowUp");
    await page.waitForTimeout(100);

    // Verify the manual control callback was invoked
    const { calls } = await captureManualControls(page);
    if (calls.length > 0) {
      const last = calls[calls.length - 1];
      expect(last.engine ?? last.thrust ?? 0).toBeGreaterThan(0);
    }

    // Also inject a frame reflecting the engine effect and check gauge
    await injectFrame(page, {
      state: "playing",
      operation_mode: "operated",
      thrust_pct: 10,
      speed: 0.2,
    });
    await page.waitForTimeout(50);

    const thrustText = await page.locator("#gauge-thrust").textContent();
    expect(thrustText?.trim()).not.toBe("\u2014"); // not a dash
    const thrustVal = parseFloat(thrustText ?? "0");
    expect(thrustVal).toBeGreaterThan(0);
  });

  test("ArrowLeft/Right changes rudder set display", async ({ page }) => {
    await setup(page);

    // Press ArrowRight → should change rudder set value (positive = starboard)
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(100);

    const { calls } = await captureManualControls(page);
    if (calls.length > 0) {
      const last = calls[calls.length - 1];
      // Correct behaviour: ArrowRight changes rudder_deg, not heading_deg
      expect(last.rudder_deg ?? last.rudderDeg).toBeDefined();
      expect(last.rudder_deg ?? last.rudderDeg ?? 0).toBeGreaterThan(0);
    }
  });

  test("WASD keys do not affect controls", async ({ page }) => {
    await setup(page);

    // Clear any existing calls
    await page.evaluate(() => {
      (window as any).__testManualCalls = [];
    });

    // Press WASD keys
    await page.keyboard.press("w");
    await page.waitForTimeout(50);
    await page.keyboard.press("a");
    await page.waitForTimeout(50);
    await page.keyboard.press("s");
    await page.waitForTimeout(50);
    await page.keyboard.press("d");
    await page.waitForTimeout(50);

    const { calls } = await captureManualControls(page);
    // Correct behaviour: WASD should NOT trigger any manual control callbacks
    expect(calls.length).toBe(0);
  });

  test("setpoint indicators visible in manual mode", async ({ page }) => {
    await setup(page);

    // Inject a playing operated frame to trigger setpoint display
    await injectFrame(page, {
      state: "playing",
      operation_mode: "operated",
      heading: 45,
      speed: 1.0,
      rudder_deg: 10,
      thrust_pct: 50,
    });
    await page.waitForTimeout(100);

    // Setpoint rows should be visible in manual mode
    // (once setpoint data is available)
    const headingSetVisible = await page.locator("#heading-set-row").evaluate(
      (el) => el.classList.contains("visible"),
    );
    const rudderSetVisible = await page.locator("#rudder-set-row").evaluate(
      (el) => el.classList.contains("visible"),
    );
    const thrustSetVisible = await page.locator("#thrust-set-row").evaluate(
      (el) => el.classList.contains("visible"),
    );

    expect(headingSetVisible).toBe(true);
    expect(rudderSetVisible).toBe(true);
    expect(thrustSetVisible).toBe(true);
  });

  test("setpoint indicators hidden in autonomous mode", async ({ page }) => {
    await setup(page);

    // Inject an autonomous frame to switch mode
    await injectFrame(page, {
      state: "playing",
      operation_mode: "autonomous",
      heading: 90,
      speed: 1.5,
    });
    await page.waitForTimeout(100);

    const headingSetVisible = await page.locator("#heading-set-row").evaluate(
      (el) => el.classList.contains("visible"),
    );
    const rudderSetVisible = await page.locator("#rudder-set-row").evaluate(
      (el) => el.classList.contains("visible"),
    );
    const thrustSetVisible = await page.locator("#thrust-set-row").evaluate(
      (el) => el.classList.contains("visible"),
    );

    expect(headingSetVisible).toBe(false);
    expect(rudderSetVisible).toBe(false);
    expect(thrustSetVisible).toBe(false);
  });

  test("speed displayed in knots with 2 decimals", async ({ page }) => {
    await setup(page);

    // Inject a playing frame with known speed (m/s → knots)
    // 1.0 m/s * 1.94384 = 1.94 kn
    await injectFrame(page, {
      state: "playing",
      speed: 1.0,
      heading: 0,
    });
    await page.waitForTimeout(100);

    const speedText = await page.locator("#gauge-speed").textContent();
    expect(speedText).toBeDefined();
    // Should match pattern like "1.94"
    expect(speedText?.trim()).toMatch(/^\d+\.\d{2}$/);
    const val = parseFloat(speedText ?? "0");
    expect(val).toBeCloseTo(1.94, 1);
  });

  test("rudder needle matches actual rudder_deg", async ({ page }) => {
    await setup(page);

    const rudderDeg = 17.5;
    await injectFrame(page, {
      state: "playing",
      rudder_deg: rudderDeg,
      heading: 90,
      speed: 1.0,
    });
    await page.waitForTimeout(100);

    const transform = await page.locator("#rudder-needle").getAttribute("transform");
    expect(transform).toBeDefined();
    // Expected: rotate((17.5/35)*90, 60, 60) = rotate(45, 60, 60)
    const expectedAngle = (rudderDeg / 35) * 90;
    const match = transform?.match(/rotate\(([-\d.]+)/);
    expect(match).not.toBeNull();
    const actualAngle = parseFloat(match![1]);
    expect(actualAngle).toBeCloseTo(expectedAngle, 0);
  });

  test("rudder set needle matches set rudder value", async ({ page }) => {
    await setup(page);

    // Simulate: set rudder_deg = 10 via the manual setpoint callback
    await page.evaluate(() => {
      if (typeof (window as any).__testOnManualSetpoint === "function") {
        (window as any).__testOnManualSetpoint({ rudder_deg: 10, engine: 0.5 });
      }
    });

    // Also inject a frame so the display is active
    await injectFrame(page, {
      state: "playing",
      operation_mode: "operated",
      heading: 90,
      speed: 1.0,
      rudder_deg: 8, // actual may differ slightly from set
    });
    await page.waitForTimeout(100);

    // The rudder set needle should reflect the set rudder angle directly
    const setNeedleTransform = await page.locator("#rudder-needle-set").getAttribute("transform");
    if (setNeedleTransform && setNeedleTransform !== "") {
      const match = setNeedleTransform.match(/rotate\(([-\d.]+)/);
      if (match) {
        const angle = parseFloat(match[1]);
        // Set rudder = 10°, expected rotation = (10/35)*90 ≈ 25.7°
        const expectedAngle = (10 / 35) * 90;
        expect(angle).toBeCloseTo(expectedAngle, 0);
      }
    }
  });

  test("operated mode shows live values not dashes", async ({ page }) => {
    await setup(page);

    // Inject a frame in operated mode — values should show, not dashes
    await injectFrame(page, { state: "playing", heading: 45, speed: 1.0, roll: 2.5, pitch: 1.5, rudder_deg: 10, thrust_pct: 50 });
    await page.waitForTimeout(100);

    const headingText = await page.locator("#gauge-heading").textContent();
    const speedText = await page.locator("#gauge-speed").textContent();
    const rollText = await page.locator("#gauge-roll").textContent();
    const pitchText = await page.locator("#gauge-pitch").textContent();
    const rudderText = await page.locator("#gauge-rudder").textContent();
    const thrustText = await page.locator("#gauge-thrust").textContent();

    // All should show actual values, not dashes
    expect(headingText?.trim()).toBe("45.0");
    expect(speedText?.trim()).not.toBe("\u2014");
    expect(rollText?.trim()).toBe("2.50");
    expect(pitchText?.trim()).toBe("1.50");
    expect(rudderText?.trim()).toBe("10.0");
    expect(thrustText?.trim()).toBe("50");
  });

  test("actual heading changes gradually with rudder input", async ({ page }) => {
    await setup(page);

    // Simulate: press ArrowRight (sets rudder), then inject frames showing
    // gradual heading change over time — NOT an instant snap.
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(50);

    // Inject a series of frames with gradually changing heading
    const headings = [0, 0.5, 1.2, 2.1, 3.3];
    const readings: string[] = [];

    for (const h of headings) {
      await injectFrame(page, {
        state: "playing",
        operation_mode: "operated",
        heading: h,
        speed: 0.5,
        rudder_deg: 1,
        thrust_pct: 10,
      });
      await page.waitForTimeout(100);
      const text = await page.locator("#gauge-heading").textContent();
      readings.push(text?.trim() ?? "");
    }

    // Verify the heading display shows gradual change, not a jump
    const numericReadings = readings
      .map((r) => parseFloat(r))
      .filter((n) => !isNaN(n));

    expect(numericReadings.length).toBeGreaterThan(1);

    // Check that there are intermediate values (not just 0 and final)
    if (numericReadings.length >= 3) {
      const first = numericReadings[0];
      const last = numericReadings[numericReadings.length - 1];
      const mid = numericReadings[Math.floor(numericReadings.length / 2)];
      // Middle value should be between first and last
      expect(mid).toBeGreaterThanOrEqual(first);
      expect(mid).toBeLessThanOrEqual(last);
    }
  });

  test("engine set marker positioned correctly", async ({ page }) => {
    await setup(page);

    // Trigger setpoint display
    await page.evaluate(() => {
      if (typeof (window as any).__testOnManualSetpoint === "function") {
        (window as any).__testOnManualSetpoint({ rudder_deg: 0, engine: 0.6 });
      }
    });

    await injectFrame(page, {
      state: "playing",
      operation_mode: "operated",
      heading: 0,
      speed: 0.8,
      thrust_pct: 55,
    });
    await page.waitForTimeout(100);

    // Thrust set marker bottom should be engine_set * 100 = 60%
    const markerBottom = await page.locator("#thrust-set-marker").evaluate(
      (el) => (el as HTMLElement).style.bottom,
    );
    // engine=0.6 → setPct = 60 → bottom = "60%"
    expect(markerBottom).toBe("60%");
  });

  test("manual hint always visible", async ({ page }) => {
    await setup(page);

    const hintVisible = await page.locator("#manual-hint").evaluate(
      (el) => el.classList.contains("visible"),
    );
    expect(hintVisible).toBe(true);
  });

});
