import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        background: resolve(__dirname, "src/background/background.js"),
        content: resolve(__dirname, "src/content/content.js")
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "background") return "background/[name].js";
          if (chunkInfo.name === "content") return "content/[name].js";
          return "[name].js";
        }
      }
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true
  }
});
