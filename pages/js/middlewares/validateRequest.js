const Content = `
import { ZodError } from 'zod';
import { HttpValidationExceptions } from '../utils/httpExceptions.js';

/**
 * Middleware untuk memvalidasi request body menggunakan Zod schema.
 * @param {import('zod').ZodSchema} validationSchema
 * @returns {Function}
 */
const ValidateRequest = (validationSchema) => {
	return async (req, _res, next) => {
		try {
			await validationSchema.parseAsync(req.body);
			next();
		} catch (err) {
			if (err instanceof ZodError) {
				const errorMessages = err.errors.map((error) => ({
					[error.path.join('.')]: error.message,
				}));
				next(new HttpValidationExceptions(errorMessages));
			} else {
				next(err);
			}
		}
	};
};

export default ValidateRequest;
`.trimStart();

export default Content;
