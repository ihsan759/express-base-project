import { select } from '@inquirer/prompts';
import { execSync } from 'child_process';
import { createSpinner } from 'nanospinner';

/**
 * Mengambil semua versi dari sebuah library menggunakan perintah npm view.
 * @param {string} library - Nama library yang ingin diambil versinya.
 * @returns {string} - Versi yang dipilih user.
 */
export async function getAllVersions(library) {
	const spinner = createSpinner(
		`Mengambil versi ${library} dari npm...`
	).start();
	let versions = [];

	try {
		const output = execSync(`npm view ${library} versions --json`, {
			encoding: 'utf-8',
		});
		const allVersions = JSON.parse(output);

		// Filter hanya versi stable (tidak mengandung "-")
		versions = allVersions
			.filter((v) => !v.includes('-'))
			.slice(-20)
			.reverse();

		spinner.success({ text: 'Versi berhasil diambil.' });
	} catch (err) {
		spinner.error({ text: 'Gagal mengambil versi.' });
		console.error(err.message);
		process.exit(1);
	}

	return await select({
		message: `Pilih versi ${library} yang ingin diinstall:`,
		choices: versions.map((v) => ({ name: v, value: v })),
	});
}
