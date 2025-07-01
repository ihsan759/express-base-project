import inquirer from 'inquirer';
import { LIBRARIES } from '../meta_datas/libraryMetaData.js';
/**
 * Asks the user to select libraries for which they want to customize the version.
 * @returns {Promise<string[]>} A promise that resolves to an array of selected library names.
 */
export async function askVersion() {
	const versionableLibs = Object.entries(LIBRARIES)
		.filter(([_, meta]) => meta.version === true)
		.map(([key]) => key);
	const { selectedLibs } = await inquirer.prompt([
		{
			type: 'checkbox',
			name: 'selectedLibs',
			message: '📦 Pilih library yang ingin dicustom versinya:',
			choices: versionableLibs,
		},
	]);

	return selectedLibs;
}
