import { defineConfig } from "vite";

export default defineConfig({
  base: "/nombre-repo/", // Reemplaza 'nombre-repo' por el nombre de tu repositorio
  build: {
    outDir: "dist",
  },
});
