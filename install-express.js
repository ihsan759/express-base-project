#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { ensurePackageJson } from './utils/package.js';
import { ensureTSConfig } from './utils/tsconfig.js';
import { askVersion } from './utils/askVersion.js';
import { installTypescript } from './installers/typesciptInstaller.js';
import { installWithConfirmation } from './utils/askInstaller.js';
import { input } from '@inquirer/prompts';
import { LIBRARIES } from './meta_datas/libraryMetaData.js';
import { generatePages } from './generators/pageGenerator.js';
import { PAGE } from './meta_datas/pageMetaData.js';

const args = process.argv.slice(2);
let targetDir = '.';

// Ambil nama script dari path, misalnya: /project/install-express.js
const scriptPath = process.argv[1]; // Misalnya: /project/install-express.js
const scriptName = path.basename(scriptPath, path.extname(scriptPath)); // → install-express
targetDir = path.resolve('.', scriptName);

// Ambil argumen target folder
args.forEach((arg, i) => {
	if ((arg === '--target' || arg === '-t') && args[i + 1]) {
		targetDir = args[i + 1];
	}
});

async function main() {
	const resolvedPath = path.resolve(targetDir);

	// Buat folder jika belum ada
	if (!fs.existsSync(resolvedPath)) {
		fs.mkdirSync(resolvedPath, { recursive: true });
	}

	await ensurePackageJson(resolvedPath);

	const selectedLibs = await askVersion();
	let typescript = selectedLibs.includes('typescript');
	if (!typescript) {
		const confirm = await input({
			message: `Apakah Anda ingin menginstall typescript? (y/n)`,
			default: 'y',
		});
		if (confirm.toLowerCase() == 'y') {
			typescript = await installTypescript(resolvedPath, false);
		}
	} else {
		typescript = await installTypescript(resolvedPath, true);
	}

	if (selectedLibs.includes('typescript') || typescript) {
		await ensureTSConfig(resolvedPath);
	}

	const LIBS_TO_INSTALL = Object.keys(LIBRARIES).filter(
		(name) => name !== 'typescript'
	);

	for (const lib of LIBS_TO_INSTALL) {
		await installWithConfirmation(resolvedPath, lib, selectedLibs, typescript);
	}

	await generatePages(PAGE, 'prisma', typescript, resolvedPath);
}

main();
