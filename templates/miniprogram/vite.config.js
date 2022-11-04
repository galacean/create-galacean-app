import { defineConfig } from "vite";
const path = require("path");

function replacePackage() {
  return {
    name: "replace-Package",
    enforce: "pre",
    resolveId(id) {
      if (id === "oasis-engine") {
        let oasisPath = path.join(
          __dirname,
          "/node_modules/oasis-engine/dist/miniprogram.js"
        );
        return oasisPath;
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
          external: ["@oasis-engine/miniprogram-adapter"],
          output: {
            entryFileNames: "oasis-app.umd.js",
            globals: {},
          },
          plugins: [],
        },
        lib: {
          entry: "./src/main.ts",
          name: "oasis",
          formats: ["umd"],
        },
        outDir: "mini/dist",
        emptyOutDir: false,
        minify: false,
      },
    };
  }
});
