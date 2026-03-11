/** Initialize the top-bar clock and update it every second. */
export function initClock(): void {
  const clockEl = document.getElementById("top-bar-clock")!;
  function update() {
    clockEl.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }
  update();
  setInterval(update, 1000);
}
