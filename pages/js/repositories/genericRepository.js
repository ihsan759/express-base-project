const Content = `
export default class GenericRepository {
	/**
	 * @param {any} model - ORM delegate (ex: prisma.account)
	 */
	constructor(model) {
		this.model = model;
	}

	/**
	 * Mengambil semua data.
	 * @param {object} [select]
	 * @returns {Promise<any[]>}
	 */
	async getAll(select) {
		return await this.model.findMany({
			select: select || undefined,
		});
	}

	/**
	 * Mengambil data berdasarkan ID.
	 * @param {string} id
	 * @returns {Promise<any>}
	 */
	async getById(id) {
		return await this.model.findUnique({ where: { id } });
	}

	/**
	 * Mengambil data berdasarkan key tertentu.
	 * @param {string} key
	 * @param {any} value
	 * @param {{ select?: object, many?: boolean }} [options]
	 * @returns {Promise<any>}
	 */
	async getByKey(key, value, options = {}) {
		const query = {
			where: { [key]: value },
			select: options.select,
		};

		return options.many
			? await this.model.findMany(query)
			: await this.model.findFirst(query);
	}

	/**
	 * Membuat data baru.
	 * @param {object} data
	 * @returns {Promise<any>}
	 */
	async create(data) {
		return await this.model.create({ data });
	}

	/**
	 * Mengupdate data berdasarkan ID.
	 * @param {string} id
	 * @param {object} data
	 * @returns {Promise<any>}
	 */
	async update(id, data) {
		return await this.model.update({ where: { id }, data });
	}

	/**
	 * Menghapus data berdasarkan ID.
	 * @param {string} id
	 * @returns {Promise<any>}
	 */
	async delete(id) {
		return await this.model.delete({ where: { id } });
	}
}
`.trimStart();

export default Content;
