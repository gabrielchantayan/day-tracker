import { find_one, update, delete_one } from '../db/db';
import success_handler from '../misc/success-handler';
import { convert_time_string_to_ms } from '../misc/utils';

/**
 * Generates a faster and more efficient random token string.
 * @returns {string} A faster and more efficient token.
 */
const generate_token = (): string => {
	return (
		Math.random().toString(36).slice(2) +
		Math.random().toString(36).slice(2) +
		Math.random().toString(36).slice(2) +
		Math.random().toString(36).slice(2)
	);
};

/**
 * Grants a new token to a user.
 * @param {string} user The user who should be granted a new token.
 * @returns {Promise<success_handler>} A promise that resolves to a success handler.
 */
const grant_user_new_token = async (req) => {
	const { user } = req;

	// Generate a new token
	let token = generate_token();

	// Ensure the token is unique
	const token_is_unique = await ensure_unique_token(token);
	if (!token_is_unique.success) {
		// If the token is not unique, generate a new one
		return grant_user_new_token(user);
	} else {
		// Update the database with the new token
		const updated = await update(
			'tokens',
			{ user: user },
			{ token: token, expiry: Date.now() + convert_time_string_to_ms('30-d') }
		);

		// Return a success handler
		return success_handler(true, { token: token }, 'auth.token.granted');
	}
};

/**
 * Grants a token to a user. If the user does not have a token, a new one is generated.
 * @param {string} user The user who should be granted a token.
 * @returns {Promise<success_handler>} A promise that resolves to a success handler.
 */
const grant_user_token = async (req) => {
	const user = req.email;


	// Check the database for the token
	const db_token = await find_one('tokens', { user: user });
	if (!db_token || !db_token.token || db_token.expiry < Date.now()) {
		// If the token is invalid or expired, generate a new one
		return await grant_user_new_token(user);
	} 

	// If the token is valid, return a success handler
	return success_handler(true, { token: db_token.token }, 'auth.token.granted');
};

/**
 * Revokes a user's token.
 * @param {string} user The user whose token should be revoked.
 * @returns {void} Does not return anything.
 */
const revoke_user_token = async (user: string) => {
	// Delete the token from the database
	const ret = await delete_one('tokens', { user: user });
	return success_handler(true, null, 'auth.token.revoked');
};

const validate_token = async (req) => {
	const { user, token } = req;

	if (!user || !token)
		return success_handler(false, { missing_field: !user ? 'user' : 'token' }, 'error.api.field.missing');

	const db_token = await find_one('users', { user: user });
	if (!db_token) return success_handler(false, null, 'error.auth.user.not-found');
	if (!db_token.token) return success_handler(false, null, 'error.auth.token.not-found');
	if (db_token.token !== token) return success_handler(false, null, 'error.auth.token.invalid');
	return success_handler(true, null, 'auth.token.valid');
};

/**
 * Checks if a token is unique.
 * @param {string} token The token to be checked.
 * @returns {Promise<success_handler>} A promise that resolves to a success handler.
 */
const ensure_unique_token = async (token: string) => {
	const db_token = await find_one('tokens', { token: token });

	if (db_token) {
		return success_handler(false, null, 'error.auth.token.exists');
	} else {
		return success_handler(true, null, 'auth.token.valid');
	}
};

export { grant_user_new_token, grant_user_token, revoke_user_token, validate_token };
