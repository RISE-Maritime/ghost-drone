/** Read a CSS custom property value from the document root. */
export function cssVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name).trim();
}

/** Wire up the theme <select> element. Returns a callback to notify on change. */
export function initTheme(onThemeChange: () => void): void {
  document.getElementById("theme-select")!.addEventListener("change", function (this: HTMLSelectElement) {
    document.documentElement.setAttribute("data-obc-theme", this.value);
    onThemeChange();
  });
}
