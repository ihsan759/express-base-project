// generators/pageGenerator.js
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

/**
 * Mengenerate file page berdasarkan metadata.
 * @param {object} PAGE - Metadata halaman
 * @param {string} orm - ORM yang digunakan (misal: "prisma", "typeorm")
 * @param {boolean} isTs - Apakah menggunakan TypeScript
 * @param {string} baseDir - Direktori root project
 */
export async function generatePages(
	PAGE,
	orm = 'prisma',
	isTs = false,
	baseDir = process.cwd()
) {
	for (const [name, config] of Object.entries(PAGE)) {
		let ext = '.js';
		if (config.types && isTs) ext = '.ts';

		// Resolusi file content
		let contentPath = config.content;

		if (typeof config.content === 'object') {
			if (config.orm && typeof config.content[orm] === 'object') {
				// Handle nested content by orm + typescript
				contentPath = isTs ? config.content[orm].ts : config.content[orm].js;
			} else if (config.orm && typeof config.content[orm] === 'string') {
				contentPath = config.content[orm];
			} else if (config.types && isTs && config.content.ts) {
				contentPath = config.content.ts;
			} else if (config.types && !isTs && config.content.js) {
				contentPath = config.content.js;
			} else {
				contentPath =
					config.content.default || Object.values(config.content)[0];
			}
		}

		const fullContentPath = pathToFileURL(path.resolve(contentPath)).href;
		const mod = await import(fullContentPath);
		const content = mod.default;

		if (!content) {
			throw new Error(
				`File ${contentPath} tidak memiliki export default. Pastikan Anda export default template string.`
			);
		}
		const skipExt = ['.env', '.gitignore'];
		const filename = skipExt.includes(name) ? name : name + ext;

		const pathArray = Array.isArray(config.path) ? config.path : [];
		const outputPath = path.join(baseDir, ...pathArray, filename);

		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		fs.writeFileSync(outputPath, content);

		console.log(`[create]: ${outputPath}`);
	}
}
