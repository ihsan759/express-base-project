import { execSync } from 'child_process';
import { createSpinner } from 'nanospinner';
import { getAllVersions } from '../utils/version.js';
import { LIBRARIES } from '../meta_datas/libraryMetaData.js';
import { getClosestTypesVersion } from '../utils/typeVersion.js';

export async function libraryInstaller(
	resolvedPath,
	CustomVersion = false,
	name,
	isTs = false
) {
	let version = 'latest';
	if (CustomVersion) {
		version = await getAllVersions(name);
	}

	const meta = LIBRARIES[name];

	const spinner = createSpinner(
		`Now installing ${name}@${version} into ${resolvedPath}...`
	).start();

	try {
		const isDev = meta.dependencies === 'devDependencies';
		const flag = isDev ? '-D' : '';
		execSync(`npm install ${flag} ${name}@${version}`, {
			cwd: resolvedPath,
			stdio: 'inherit',
		});
		spinner.success({
			text: `${name}@${version} was installed successfully in ${resolvedPath}.`,
		});
	} catch (err) {
		spinner.error({ text: `Failed to install ${name}.` });
		console.error(err.message);
	}

	if (isTs && meta.types) {
		const typesSpinner = createSpinner(
			`Now installing @types/${meta.types.name} into ${resolvedPath}...`
		).start();
		try {
			let tsVersion = await getClosestTypesVersion(meta.types.name, version);
			if (!tsVersion) {
				tsVersion = 'latest';
			}
			execSync(`npm install -D @types/${meta.types.name}@${tsVersion}`, {
				cwd: resolvedPath,
				stdio: 'inherit',
			});
			typesSpinner.success({
				text: `@types/${meta.types.name} was installed successfully in ${resolvedPath}.`,
			});
		} catch (err) {
			typesSpinner.error({
				text: `Failed to install @types/${meta.types.name}.`,
			});
			console.error(err.message);
		}
	}

	if (meta.special) {
		const specialSpinner = createSpinner(
			`Now installing ${meta.special.name}@${version} into ${resolvedPath}...`
		).start();
		try {
			const isDev = meta.special.dependencies === 'devDependencies';
			const flag = isDev ? '-D' : '';
			execSync(`npm install ${flag} ${meta.special.name}@${version}`, {
				cwd: resolvedPath,
				stdio: 'inherit',
			});
			specialSpinner.success({
				text: `${meta.special.name} was installed successfully in ${resolvedPath}.`,
			});
		} catch (err) {
			specialSpinner.error({
				text: `Failed to installd ${meta.special.name}.`,
			});
			console.error(err.message);
		}
	}

	if (meta.npx && meta.init) {
		const cmd = meta.npxCommand || `${name} init`;
		const spinner = createSpinner(`Now running: npx ${cmd} ...`).start();
		try {
			execSync(`npx ${cmd}`, {
				cwd: resolvedPath,
				stdio: 'inherit',
			});
			spinner.success({ text: `Command executed successfully: npx ${cmd}` });
		} catch (err) {
			spinner.error({ text: `Error running: npx ${cmd}` });
			console.error(err.message);
		}
	}
}
