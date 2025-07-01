export const LIBRARIES = {
	express: {
		dependencies: 'dependencies',
		types: {
			name: 'express',
			dependencies: 'devDependencies',
		},
		special: false,
		version: true,
		force: true,
	},
	'cookie-parser': {
		dependencies: 'dependencies',
		types: {
			name: 'cookie-parser',
			dependencies: 'devDependencies',
		},
		special: false,
		version: false,
		force: true,
	},
	jsonwebtoken: {
		dependencies: 'dependencies',
		types: {
			name: 'jsonwebtoken',
			dependencies: 'devDependencies',
		},
		special: false,
		version: true,
		force: true,
	},
	dotenv: {
		dependencies: 'dependencies',
		types: false,
		special: false,
		version: false,
		force: true,
	},
	prisma: {
		dependencies: 'devDependencies',
		types: false,
		special: {
			name: '@prisma/client',
			dependencies: 'dependencies',
		},
		version: true,
		force: true,
		npx: true,
		init: true,
		npxCommand: 'prisma init',
	},
	zod: {
		dependencies: 'dependencies',
		types: false,
		special: false,
		version: true,
		force: true,
	},
	bcrypt: {
		dependencies: 'dependencies',
		types: {
			name: 'bcrypt',
			dependencies: 'devDependencies',
		},
		special: false,
		version: false,
		force: true,
	},
	typescript: {
		dependencies: 'devDependencies',
		types: false,
		special: false,
		version: true,
		force: false,
	},
};
