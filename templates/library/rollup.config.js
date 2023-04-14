import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";
import miniProgramPlugin from "./rollup.miniprogram.plugin";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const name = pkg.name;

const plugins = [
	resolve({ extensions }),

	babel({
		babelHelpers: "bundled",
		presets: [
			[
				"@babel/preset-env",
				{
					loose: true,
					targets: ">0.3%, not dead",
					bugfixes: true,
				},
			],
			"@babel/preset-typescript",
		],
		extensions,
		include: ["src/**/*"],
		plugins: [
			["@babel/plugin-proposal-decorators", { legacy: true }],
			["@babel/plugin-proposal-class-properties", { loose: true }],
			"@babel/plugin-proposal-optional-chaining",
		],
	}),
]

export default [{
	input: "./src/index.ts",
	// Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
	// https://rollupjs.org/guide/en#external-e-external
	external: ["@galacean/engine"],

	plugins,

	output: [
		{
			file: pkg.module,
			format: "es",
		},
		{
			file: pkg.browser,
			format: "umd",
			name,
			globals: {
				"@galacean/engine": "Galacean",
			},
		},
	],
}, {
	input: "./src/index.ts",
	output: [
		{
			format: "umd",
			file: path.join(location, "dist/miniprogram.js"),
			sourcemap: false
		}
	],
	external: ["@galacean/engine/dist/miniprogram", "@galacean/miniprogram-adapter"],
	plugins: [...plugins, ...miniProgramPlugin]
}];
