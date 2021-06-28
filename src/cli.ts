import cac from "cac";
import { createApp } from "./create-app";
import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";
import fs from "fs";

const cli = cac();

cli.option("-t, --template [template]", "Choose your project template");

try {
	const p = path.join(__dirname, "../package.json");
	const pkg = JSON.parse(fs.readFileSync(p, { encoding: "utf-8" }));
	console.log(`create-oasis-app: ` + pkg.version);
} catch (e) {}

// cli.help();
const parsed = cli.parse();

const directory = parsed.args[0];
const template = parsed.options["template"];

const questions: inquirer.QuestionCollection[] = [];

if (!directory) {
	questions.push({
		type: "input",
		name: "directory",
		message: "Input Directory",
		default: ".",
	});
}

if (!template) {
	questions.push({
		type: "list",
		name: "template",
		message: "Select a template:",
		choices: [
			{ name: chalk.yellow("Vanilla"), value: "vanilla" },
			{ name: chalk.cyan("React"), value: "react" },
			{ name: chalk.green("Vue"), value: "vue" },
			{ name: chalk.blueBright("Ali-Mini"), value: "miniprogram" },
			{ name: chalk.redBright("Library"), value: "library" },
		],
		default: ".",
	});
}

questions.push({
	type: "input",
	name: "lib",
	message: "Input the name of library:",
	default: "oasis-lib",
	when: (answers) => {
		const t = template ?? answers.template;
		return template === "library";
	},
});

// supress warning
setTimeout(async () => {
	console.log(chalk.cyanBright("You are creating an oasis application."));
	const anwsers = {
		template,
		directory,
		lib: undefined,
		...(await inquirer.prompt(questions)),
	};
	const cwd = process.cwd();
	const targetPath = path.join(cwd, anwsers.directory);
	createApp(anwsers.template, targetPath, anwsers.lib);
	console.log(`\nDone. Now run:\n`);
	if (targetPath !== cwd) {
		console.log(`  cd ${path.relative(cwd, targetPath)}`);
	}
	console.log(`  npm install (or \`yarn\`)`);
	console.log(`  npm run dev (or \`yarn dev\`)`);
	console.log();
}, 0);
