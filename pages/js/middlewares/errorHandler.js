const Content = `
import { CustomError } from '../utils/httpExceptions.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';

const ErrorFactory = (err, res) => {
	if (err instanceof CustomError) {
		const { statusCode, stack, isLogging, errors } = err;
		if (isLogging) {
			const logMessage = JSON.stringify({ statusCode, errors, stack }, null, 2);
			console.log(logMessage);
		}
		return res.status(statusCode).send({ errors });
	}
	if (err instanceof PrismaClientKnownRequestError) {
		console.log(JSON.stringify(err, null, 2));
		return res.status(400).send({ errors: [{ message: 'Bad Request' }] });
	}
	return null;
};

const ErrorHandler = (err, _req, res, _next) => {
	const handledError = ErrorFactory(err, res);
	if (!handledError) {
		console.log(JSON.stringify(\`Unhandled error: \${err}\`, null, 2));
		return res
			.status(500)
			.send({ errors: [{ message: 'Internal server error' }] });
	}
};

export default ErrorHandler;
`.trimStart();

export default Content;
