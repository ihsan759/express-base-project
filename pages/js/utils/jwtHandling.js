const Content = `
import jwt from 'jsonwebtoken';
import { HttpException } from './HttpExceptions.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @typedef {Object} AuthTokens
 * @property {string} accessToken
 * @property {string} refreshToken
 */

const {
	ACCESS_TOKEN_SECRET,
	ACCESS_TOKEN_EXPIRY,
	REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRY,
} = process.env;

/**
 * JWT Helper Class
 */
export class JwtHandling {
	/**
	 * Generate Access and Refresh Tokens
	 * @param {object} payload
	 * @returns {AuthTokens}
	 */
	genAuthTokens(payload) {
		const accessToken = this.sign(payload, ACCESS_TOKEN_SECRET, {
			expiresIn: parseInt(ACCESS_TOKEN_EXPIRY, 10),
		});
		const refreshToken = this.sign(payload, REFRESH_TOKEN_SECRET, {
			expiresIn: parseInt(REFRESH_TOKEN_EXPIRY, 10),
		});
		return { accessToken, refreshToken };
	}

	/**
	 * Verify JWT token
	 * @param {string} token
	 * @param {string} secret
	 * @returns {Promise<jwt.JwtPayload>}
	 */
	async verify(token, secret) {
		return await new Promise((resolve, reject) => {
			jwt.verify(token, secret, (err, decoded) => {
				if (err) reject(new HttpException(403, 'Forbidden'));
				else resolve(decoded);
			});
		});
	}

	/**
	 * Sign JWT token
	 * @param {object} payload
	 * @param {string} secret
	 * @param {jwt.SignOptions} [options]
	 * @returns {string}
	 */
	sign(payload, secret, options) {
		return jwt.sign(payload, secret, options);
	}
}
`.trimStart();

export default Content;
