const Content = `
export class CustomError extends Error {
	constructor(message) {
		super(message);
		Object.setPrototypeOf(this, CustomError.prototype);
	}

	get statusCode() {
		throw new Error('statusCode getter must be implemented');
	}

	get errors() {
		throw new Error('errors getter must be implemented');
	}

	get isLogging() {
		throw new Error('isLogging getter must be implemented');
	}
}

export class HttpException extends CustomError {
	constructor(statusCode = 500, message = 'Something went wrong', isLogging = false) {
		super(message);
		this._statusCode = statusCode;
		this._isLogging = isLogging;
		Object.setPrototypeOf(this, HttpException.prototype);
	}

	get statusCode() {
		return this._statusCode;
	}

	get errors() {
		return [this.message];
	}

	get isLogging() {
		return this._isLogging;
	}
}

export class HttpValidationExceptions extends CustomError {
	constructor(errors = [{ error: 'Bad Request' }], isLogging = false) {
		super('Bad Request');
		this._errors = errors;
		this._isLogging = isLogging;
		Object.setPrototypeOf(this, HttpValidationExceptions.prototype);
	}

	get statusCode() {
		return 400;
	}

	get errors() {
		return this._errors;
	}

	get isLogging() {
		return this._isLogging;
	}
}
`.trimStart();

export default Content;
