import fs from 'fs';
import path from 'path';
/* * Memastikan file tsconfig.json ada di direktori yang diberikan.
 * Jika tidak ada, buat file tsconfig.json dengan konfigurasi default.
 *
 * @param {string} directory - Direktori tempat tsconfig.json akan diperiksa atau dibuat.
 */
export async function ensureTSConfig(directory) {
	const tsConfigPath = path.join(directory, 'tsconfig.json');
	if (!fs.existsSync(tsConfigPath)) {
		console.log('📦 tsconfig.json tidak ditemukan. Membuat baru...');
		fs.writeFileSync(
			tsConfigPath,
			JSON.stringify(
				{
					compilerOptions: {
						target: 'es2016',
						module: 'commonjs',
						esModuleInterop: true,
						forceConsistentCasingInFileNames: true,
						strict: true,
						skipLibCheck: true,
					},
				},
				null,
				2
			)
		);
		console.log('✅ tsconfig.json berhasil dibuat.');
	}
}
