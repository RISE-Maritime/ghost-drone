import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [wasm(), topLevelAwait()],
  build: {
    outDir: "../static",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      // During dev, proxy API requests to the Python backend
      "/ws": {
        target: "ws://localhost:8000",
        ws: true,
      },
    },
  },
});
