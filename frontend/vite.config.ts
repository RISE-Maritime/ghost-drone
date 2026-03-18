import { defineConfig } from "vite";
import { resolve } from "path";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [wasm(), topLevelAwait()],
  build: {
    outDir: "../static",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        monitor: resolve(__dirname, "monitor.html"),
      },
    },
  },
  server: {
    proxy: {
      // During dev, proxy API requests to the Python backend
      "/api/ws": {
        target: "ws://localhost:8000",
        ws: true,
      },
    },
  },
});
