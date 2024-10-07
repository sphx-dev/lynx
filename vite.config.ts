import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log("Vitest mode:", mode);
  return {
    plugins: [
      nodePolyfills({
        include: ["buffer", "crypto", "stream", "vm"],
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
      globals: true, // Enables globals like `describe` and `it`
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"], // Load the setup file globally
      mockReset: true,
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html", "lcov"], // Report formats to generate
        reportsDirectory: "./coverage", // Directory to save coverage reports
        include: ["src/**/*.*"], // Files to include in coverage reports
        exclude: [
          "node_modules",
          "dist",
          "src/**/*.test.ts",
          "src/**/*.test.tsx",
          "src/**/*.stories.ts",
          "src/**/*.stories.tsx",
        ], // Files/directories to exclude
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "/src"),
        "proto-codecs": path.resolve(__dirname, "/proto-codecs"),
      },
    },
  };
});
