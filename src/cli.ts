import cac from "cac";
import { createApp } from "./create-app";

const cli = cac();

cli.option("-t, --template [template]", "Choose your project template");

// cli.help();
const parsed = cli.parse();

const template = parsed.options["template"];

const cwd = process.cwd();
if (template) {
	createApp(template, cwd);
}
