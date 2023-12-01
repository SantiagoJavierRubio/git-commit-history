import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: parseInt(process.env.CLIENT_PORT),
  },
  define: {
    "import.meta.env.SERVER_PORT": JSON.stringify(process.env.SERVER_PORT),
  },
});
