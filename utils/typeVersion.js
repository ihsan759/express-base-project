import { execSync } from 'child_process';

/** * Mengambil versi @types dari sebuah package yang paling mendekati versi utama.
 * @param {string} name - Nama package tanpa prefix @types/
 * @param {string} mainVersion - Versi utama dari package tersebut (misal: "1.2.3")
 * @returns {string|null} - Versi @types yang paling mendekati, atau null jika gagal
 */
export function getClosestTypesVersion(name, mainVersion) {
	try {
		const output = execSync(`npm view @types/${name} versions --json`, {
			encoding: 'utf-8',
		});

		const allVersions = JSON.parse(output);
		if (!Array.isArray(allVersions) || allVersions.length === 0) {
			console.warn(`⚠️  Tidak ada versi @types/${name} yang tersedia.`);
			return null;
		}

		const mainMajor = parseInt(mainVersion.split('.')[0]);

		// Prioritaskan major: sama > -1 > +1
		const candidates = [
			`${mainMajor}.`,
			`${mainMajor - 1}.`,
			`${mainMajor + 1}.`,
		];

		for (const prefix of candidates) {
			const matched = allVersions
				.slice() // clone array
				.reverse()
				.find((v) => v.startsWith(prefix));
			if (matched) return matched;
		}

		// Jika tidak ada yang cocok, ambil versi terakhir
		return allVersions[allVersions.length - 1];
	} catch (e) {
		console.error(`❌ Gagal mengambil versi @types/${name}:`, e.message);
		return null;
	}
}
