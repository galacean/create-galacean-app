import cac from "cac";
import { createApp } from "./create-app";
import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";

const cli = cac();

cli.option("-t, --template [template]", "Choose your project template");

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
		],
		default: ".",
	});
}

// supress warning
setTimeout(async () => {
	console.log(chalk.cyanBright("You are creating an oasis application."));
	const anwsers = {
		template,
		directory,
		...(await inquirer.prompt(questions)),
	};
	const targetPath = path.join(process.cwd(), anwsers.directory);
	createApp(anwsers.template, targetPath);
	console.log(
		chalk.greenBright(`Create ${anwsers.template} oasis app success!`)
	);
}, 0);
