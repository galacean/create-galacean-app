import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      // serve 独有配置
    };
  } else {
    return {
      resolve: {
        alias: {},
      },
      // build 独有配置
      build: {
        rollupOptions: {
          external: ["oasis-engine", "jimp/browser/lib/jimp", "my-adapter"],
          output: {
            globals: {
              "oasis-engine": "oasisEngine",
              "jimp/browser/lib/jimp": "Jimp",
            },
          },
          plugins: [],
        },
        lib: {
          entry: "./src/index.ts",
          name: "OASISBLESS",
          formats: ["umd"],
        },
        outDir: "mini/dist",
        emptyOutDir: false,
        minify: false,
      },
    };
  }
});
