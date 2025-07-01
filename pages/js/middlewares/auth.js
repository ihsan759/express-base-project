const Content = `
import { HttpException } from '../utils/httpExceptions.js';
import { JwtHandling } from '../utils/jwtHandling.js';
import dotenv from 'dotenv';

dotenv.config();

const { ACCESS_TOKEN_SECRET } = process.env;

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @typedef {Object} Account
 * @property {string} id
 * @property {string} email
 * @property {string} role
 */

/**
 * @typedef {Request & { account?: Account }} AuthRequest
 */
export default class Auth {
	/**
	 * Middleware untuk memverifikasi JWT
	 * @param {AuthRequest} req
	 * @param {Response} _res
	 * @param {NextFunction} next
	 */
	async verifyToken(req, _res, next) {
		try {
			const { authorization } = req.headers;
			if (!authorization) throw new HttpException(401, 'Unauthorized');

			const [type, token] = authorization.split(' ');
			if (type !== 'Bearer') throw new HttpException(401, 'Unauthorized');

			const decoded = await new JwtHandling().verify(token, ACCESS_TOKEN_SECRET);
			req.account = {
				id: decoded.id,
				email: decoded.email,
				role: decoded.role,
			};
			next();
		} catch (err) {
			next(err);
		}
	}

	/**
	 * Middleware untuk memverifikasi role yang diizinkan
	 * @param {string[]} allowedRoles
	 * @returns {(req: AuthRequest, res: Response, next: NextFunction) => void}
	 */
	verifyRoles(allowedRoles) {
		return (req, _res, next) => {
			if (!req.account || !req.account.role)
				throw new HttpException(403, 'Forbidden');
			if (!allowedRoles.includes(req.account.role))
				throw new HttpException(403, 'Forbidden');
			next();
		};
	}
}
`.trimStart();

export default Content;
