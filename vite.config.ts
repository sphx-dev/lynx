import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      nodePolyfills({
        include: ["crypto", "stream", "vm"],
      }),
      svgr(),
      react(),
    ],
    server: {
      open: false,
    },
    build: {
      outDir: "build",
      sourcemap: true,
      emptyOutDir: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setupTests",
      mockReset: true,
    },
    resolve: {
      alias: {
        src: "/src",
      },
    },
  };
});
