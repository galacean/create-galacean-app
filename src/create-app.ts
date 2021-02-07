import fs from "fs";
import path from "path";

const templatesDir = path.join("../", "templates");

export function createApp(template: string, cwd: string) {
	const templateDir = path.join(templatesDir, template);
	const isTemplateExist = fs.existsSync(templateDir);
	if (!isTemplateExist) {
		throw `Can't find template: ${template}`;
  }
}
