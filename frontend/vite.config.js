import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    scss: {
      api: "modern",
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
  },
});
