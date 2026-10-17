import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";


export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
  },
  plugins: [
    react(),
    // One bundled .d.ts: the per-file output lands in dist/react/src/ (core is
    // aliased from ../core) and imports @dreamdesk/core, which isn't published,
    // so core's source is included and its types are inlined
    dts({ include: ["src", "../core/src"], exclude: ["src/__tests__", "src/dev", "../core/src/__tests__", "../core/src/**/*.test.ts"], bundleTypes: true }),
  ],
  resolve: {
    alias: {
      "@dreamdesk/core": resolve(import.meta.dirname, "../core/src/shared.ts"),
      "@dreamdesk/os": resolve(import.meta.dirname, "../os/src/index.ts"),
    },
  },
  server: {
    fs: {
      allow: ["../.."],
    },
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      // dist/style.css, which @dreamdesk/ui/style.css points at: Vite 6+ would name it index.css
      cssFileName: "style",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
