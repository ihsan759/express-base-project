import { input } from '@inquirer/prompts';
import { libraryInstaller } from '../installers/libraryInstaller.js';
import { LIBRARIES } from '../meta_datas/libraryMetaData.js';

/** * Menginstall library dengan konfirmasi dari user.
 * Jika library sudah ada di daftar yang dipilih, langsung install.
 * Jika tidak, tanyakan kepada user apakah ingin menginstallnya.
 * @param {string} name - Nama library yang akan diinstall.
 * @param {Function} installer - Fungsi untuk menginstall library.
 * @param {string} resolvedPath - Path resolusi untuk instalasi.
 * @param {Array} selectedLibs - Daftar library yang telah dipilih oleh user.
 */
export async function installWithConfirmation(
	resolvedPath,
	name,
	selectedLibs,
	isTs = false
) {
	const libs = Object.entries(LIBRARIES)
		.filter(([_, meta]) => meta.force === true)
		.map(([key]) => key);

	if (selectedLibs.includes(name)) {
		await libraryInstaller(resolvedPath, true, name, isTs);
	} else {
		if (libs.includes(name)) {
			await libraryInstaller(resolvedPath, false, name, isTs);
		} else {
			const confirm = await input({
				message: `Would you like to install ${name}? (y/n)`,
				default: 'y',
			});
			if (confirm.toLowerCase() === 'y') {
				await libraryInstaller(resolvedPath, false, name, isTs);
			}
		}
	}
}
