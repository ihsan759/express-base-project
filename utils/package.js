import path from 'path';
import fs from 'fs';
import { input } from '@inquirer/prompts';
/**
 * Memastikan file package.json ada di direktori yang diberikan.
 * Jika tidak ada, buat file package.json baru dengan nama project yang diminta.
 * @param {string} directory - Direktori tempat package.json akan diperiksa atau dibuat.
 */

export async function ensurePackageJson(directory) {
	const pkgPath = path.join(directory, 'package.json');
	if (!fs.existsSync(pkgPath)) {
		console.log('📦 Couldn’t find package.json. Creating it now...');
		const nameproject = await input({
			message: 'Enter project name:',
			default: 'express-project',
		});
		fs.writeFileSync(
			pkgPath,
			JSON.stringify(
				{
					name: nameproject,
					version: '1.0.0',
					type: 'module',
					dependencies: {},
				},
				null,
				2
			)
		);
		console.log('✅ package.json was created successfully.');
	}
}
