import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ["@galacean/engine"],
  },
  optimizeDeps: {
    exclude: [
      "@galacean/engine",
      "@oasis-engine/core",
      "@oasis-engine/lottie",
      "@oasis-engine/math",
      "@oasis-engine/rhi-webgl",
      "@oasis-engine/loader",
      "@galacean/engine-toolkit",
      "@oasis-engine/physics-physx",
    ],
  },
});
