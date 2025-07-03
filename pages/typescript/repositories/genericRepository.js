const Content = `
export default class GenericRepository<
	TDelegate,
	TWhereInput,
	TCreateInput,
	TUpdateInput
> {
	protected readonly model: TDelegate;

	constructor(model: TDelegate) {
		this.model = model;
	}

	// handle error generic repository
	async getAll(options?: {
		where?: TWhereInput;
		select?: object;
		include?: object;
	}) {
		// @ts-expect-error
		return await this.model.findMany({
			where: options?.where,
			select: options?.select,
			include: options?.include,
		});
	}

	async getById(id: string) {
		// @ts-expect-error
		return await this.model.findUnique({ where: { id } });
	}

	async getByKey<TSelect>(
		key: keyof TWhereInput,
		value: TWhereInput[typeof key],
		options?: {
			select?: TSelect;
			many?: boolean;
			include?: object;
		}
	) {
		const query: any = {
			where: { [key]: value } as any,
		};

		if (options?.select && options?.include) {
			throw new Error(
				"Cannot use both 'select' and 'include' at the same time in Prisma."
			);
		}

		if (options?.select) query.select = options.select;
		if (options?.include) query.include = options.include;

		return options?.many
			? // @ts-expect-error
			  await this.model.findMany(query)
			: // @ts-expect-error
			  await this.model.findFirst(query);
	}

	async create(data: TCreateInput) {
		// @ts-expect-error
		return await this.model.create({ data });
	}

	async update(id: string, data: TUpdateInput) {
		// @ts-expect-error
		return await this.model.update({ where: { id }, data });
	}

	async delete(id: string) {
		// @ts-expect-error
		return await this.model.delete({ where: { id } });
	}
}
`.trimStart();

export default Content;
