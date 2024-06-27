import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/products-crud-react/",
  resolve: {
    alias: {
      "@": path.resolve("src/"),
    },
  },
  plugins: [react()],
});
