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
			message: `Do you want to choose a specific version of ts-node? (y/n)`,
			default: 'y',
		});

		if (confirm.toLowerCase() === 'y') {
			versionTsNode = await getAllVersions('ts-node');
		}
	}

	const spinner = createSpinner(
		`Now installing typescript@${versionTypescript} into ${resolvedPath}...`
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
			text: `typescript@${versionTypescript} was installed successfully in ${resolvedPath}.`,
		});
		return true;
	} catch (err) {
		spinner.error({ text: `Failed to install typescript.` });
		console.error(err.message);
		return false;
	}
}
