const Content = `
/**
 * @template TDelegate
 * @template TWhereInput
 * @template TCreateInput
 * @template TUpdateInput
 */
export default class GenericRepository {
	/**
	 * @param {TDelegate} model - Prisma model delegate (e.g., db.account)
	 */
	constructor(model) {
		/** @protected */
		this.model = model;
	}

	/**
	 * @param {{ where?: TWhereInput, select?: object, include?: object }} [options]
	 * @returns {Promise<any>}
	 */
	async getAll(options) {
		// @ts-expect-error
		return await this.model.findMany({
			where: options?.where,
			select: options?.select,
			include: options?.include,
		});
	}

	/**
	 * @param {string} id
	 * @returns {Promise<any>}
	 */
	async getById(id) {
		// @ts-expect-error
		return await this.model.findUnique({ where: { id } });
	}

	/**
	 * @template TSelect
	 * @param {keyof TWhereInput} key
	 * @param {TWhereInput[typeof key]} value
	 * @param {{ select?: TSelect, many?: boolean, include?: object }} [options]
	 * @returns {Promise<any>}
	 */
	async getByKey(key, value, options) {
		const query = {
			where: { [key]: value },
		};

		if (options?.select && options?.include) {
			throw new Error(
				"Cannot use both 'select' and 'include' at the same time in Prisma."
			);
		}

		if (options?.select) query.select = options.select;
		if (options?.include) query.include = options.include;

		// @ts-expect-error
		return options?.many
			? await this.model.findMany(query)
			: await this.model.findFirst(query);
	}

	/**
	 * @param {TCreateInput} data
	 * @returns {Promise<any>}
	 */
	async create(data) {
		// @ts-expect-error
		return await this.model.create({ data });
	}

	/**
	 * @param {string} id
	 * @param {TUpdateInput} data
	 * @returns {Promise<any>}
	 */
	async update(id, data) {
		// @ts-expect-error
		return await this.model.update({ where: { id }, data });
	}

	/**
	 * @param {string} id
	 * @returns {Promise<any>}
	 */
	async delete(id) {
		// @ts-expect-error
		return await this.model.delete({ where: { id } });
	}
}
`.trimStart();

export default Content;
