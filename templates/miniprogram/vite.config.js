import { defineConfig } from "vite";
const path = require("path");

function replacePackage() {
  return {
    name: "replace-Package",
    enforce: "pre",
    resolveId(id) {
      if (id === "@galacean/engine") {
        let _path = path.join(
          __dirname,
          "/node_modules/@galacean/engine/dist/miniprogram.js"
        );
        return _path;
      }
    },
  };
}

module.exports = defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      // serve 独有配置
    };
  } else {
    return {
      plugins: [replacePackage()],
      resolve: {
        alias: {},
      },
      // build 独有配置
      build: {
        rollupOptions: {
          external: ["@galacean/miniprogram-adapter"],
          output: {
            entryFileNames: "galacean-app.umd.js",
            globals: {},
          },
          plugins: [],
        },
        lib: {
          entry: "./src/main.ts",
          name: "galacean",
          formats: ["umd"],
        },
        outDir: "mini/dist",
        emptyOutDir: false,
        minify: false,
      },
    };
  }
});
