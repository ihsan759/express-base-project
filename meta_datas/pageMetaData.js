export const PAGE = {
	db: {
		path: ['src', 'config'],
		content: {
			prisma: 'pages/db.js',
			default: 'pages/db.js',
		},
		types: true,
		orm: true,
	},
	'.env': {
		content: {
			default: 'pages/env.js',
		},
		types: false,
		orm: false,
	},
	appRoutes: {
		path: ['src', 'routes'],
		content: {
			ts: 'pages/typescript/routes/appRoutes.js',
			js: 'pages/js/routes/appRoutes.js',
		},
		types: true,
		orm: false,
	},
	httpExceptions: {
		path: ['src', 'utils'],
		content: {
			ts: 'pages/typescript/utils/httpExceptions.js',
			js: 'pages/js/utils/httpExceptions.js',
		},
		types: true,
		orm: false,
	},
	errorHandler: {
		path: ['src', 'middlewares'],
		content: {
			prisma: {
				ts: 'pages/typescript/middlewares/errorHandler.js',
				js: 'pages/js/middlewares/errorHandler.js',
			},
			default: {
				ts: 'pages/typescript/middlewares/errorHandler.js',
				js: 'pages/js/middlewares/errorHandler.js',
			},
		},
		types: true,
		orm: true,
	},
	app: {
		path: ['src'],
		content: {
			ts: 'pages/typescript/app.js',
			js: 'pages/js/app.js',
		},
		types: true,
		orm: false,
	},
	jwtHandling: {
		path: ['src', 'utils'],
		content: {
			ts: 'pages/typescript/utils/jwtHandling.js',
			js: 'pages/js/utils/jwtHandling.js',
		},
		types: true,
		orm: false,
	},
	auth: {
		path: ['src', 'middlewares'],
		content: {
			ts: 'pages/typescript/middlewares/auth.js',
			js: 'pages/js/middlewares/auth.js',
		},
		types: true,
		orm: true,
	},
	genericRepository: {
		path: ['src', 'repositories'],
		content: {
			prisma: {
				ts: 'pages/typescript/repositories/genericRepository.js',
				js: 'pages/js/repositories/genericRepository.js',
			},
			ts: 'pages/typescript/repositories/genericRepository.js',
			js: 'pages/js/repositories/genericRepository.js',
		},
		types: true,
		orm: true,
	},
	validateRequest: {
		path: ['src', 'middlewares'],
		content: {
			ts: 'pages/typescript/middlewares/validateRequest.js',
			js: 'pages/js/middlewares/validateRequest.js',
		},
		types: true,
		orm: false,
	},
};
