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
		`Menginstall ${name}@${version} ke ${resolvedPath} ...`
	).start();

	try {
		const isDev = meta.dependencies === 'devDependencies';
		const flag = isDev ? '-D' : '';
		execSync(`npm install ${flag} ${name}@${version}`, {
			cwd: resolvedPath,
			stdio: 'inherit',
		});
		spinner.success({
			text: `${name}@${version} berhasil diinstall di ${resolvedPath}`,
		});
	} catch (err) {
		spinner.error({ text: `Gagal menginstall ${name}.` });
		console.error(err.message);
	}

	if (isTs && meta.types) {
		const typesSpinner = createSpinner(
			`Menginstall @types/${meta.types.name} ke ${resolvedPath} ...`
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
				text: `@types/${meta.types.name} berhasil diinstall di ${resolvedPath}`,
			});
		} catch (err) {
			typesSpinner.error({
				text: `Gagal menginstall @types/${meta.types.name}.`,
			});
			console.error(err.message);
		}
	}

	if (meta.special) {
		const specialSpinner = createSpinner(
			`Menginstall ${meta.special.name}@${version} ke ${resolvedPath} ...`
		).start();
		try {
			const isDev = meta.special.dependencies === 'devDependencies';
			const flag = isDev ? '-D' : '';
			execSync(`npm install ${flag} ${meta.special.name}@${version}`, {
				cwd: resolvedPath,
				stdio: 'inherit',
			});
			specialSpinner.success({
				text: `${meta.special.name} berhasil diinstall di ${resolvedPath}`,
			});
		} catch (err) {
			specialSpinner.error({ text: `Gagal menginstall ${meta.special.name}.` });
			console.error(err.message);
		}
	}

	if (meta.npx && meta.init) {
		const cmd = meta.npxCommand || `${name} init`;
		const spinner = createSpinner(`Menjalankan: npx ${cmd} ...`).start();
		try {
			execSync(`npx ${cmd}`, {
				cwd: resolvedPath,
				stdio: 'inherit',
			});
			spinner.success({ text: `Berhasil menjalankan: npx ${cmd}` });
		} catch (err) {
			spinner.error({ text: `Gagal menjalankan: npx ${cmd}` });
			console.error(err.message);
		}
	}
}
