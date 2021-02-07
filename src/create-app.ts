import fs from "fs";
import path from "path";

const templatesDir = path.join(__dirname, "../", "templates");

export function createApp(template: string, targetPath: string) {
	const templateDir = path.join(templatesDir, template);
	const isTemplateExist = fs.existsSync(templateDir);
	if (!isTemplateExist) {
		throw `Can't find template: ${template}`;
	}
	copy(templateDir, targetPath);
}

function copy(src: string, dest: string) {
	const stat = fs.statSync(src);
	if (stat.isDirectory()) {
		copyDir(src, dest);
	} else {
		fs.copyFileSync(src, dest);
	}
}

function copyDir(srcDir: string, destDir: string) {
	fs.mkdirSync(destDir, { recursive: true });
	for (const file of fs.readdirSync(srcDir)) {
		const srcFile = path.resolve(srcDir, file);
		const destFile = path.resolve(destDir, file);
		copy(srcFile, destFile);
	}
}
