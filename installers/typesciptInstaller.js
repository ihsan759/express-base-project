import { execSync } from 'child_process';
import { createSpinner } from 'nanospinner';
import { getAllVersions } from '../utils/version.js';
import { input } from '@inquirer/prompts';

export async function installTypescript(resolvedPath, CustomVersion = false) {
	let versionTypescript = 'latest';
	let versionTsNode = 'latest';
	if (CustomVersion) {
		versionTypescript = await getAllVersions('typescript');

		const confirm = await input({
			message: `Apakah Anda ingin mengcustom versi ts-node? (y/n)`,
			default: 'y',
		});

		if (confirm.toLowerCase() === 'y') {
			versionTsNode = await getAllVersions('ts-node');
		}
	}

	const spinner = createSpinner(
		`Menginstall typescript@${versionTypescript} ke ${resolvedPath} ...`
	).start();

	try {
		execSync(
			`npm install -D typescript@${versionTypescript} ts-node@${versionTsNode}`,
			{
				cwd: resolvedPath,
				stdio: 'inherit',
			}
		);
		spinner.success({
			text: `typescript@${versionTypescript} berhasil diinstall di ${resolvedPath}`,
		});
		return true;
	} catch (err) {
		spinner.error({ text: 'Gagal menginstall typescript.' });
		console.error(err.message);
		return false;
	}
}
