import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import netlify from "vite-plugin-netlify";
export default defineConfig({
  plugins: [react(), netlify()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
