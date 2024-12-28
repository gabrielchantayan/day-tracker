'use server';
import { cookies } from 'next/headers';

const cookie_store = cookies();

/**
 * Logs in the user by saving their email, token, and name to local storage.
 * @param email The user's email address.
 * @param token The user's authentication token.
 * @param name The user's name.
 */
const login = (email: string, token: string, name: string) => {
	cookie_store.set('user-email', email);
	cookie_store.set('user-token', token);
	cookie_store.set('user-name', name);
};

/**
 * Logs out the user by removing their email, token, and name from local storage.
 */
const logout = () => {
	// Remove each from local storage
	cookie_store.delete('user-email');
	cookie_store.delete('user-token');
	cookie_store.delete('user-name');
};

/**
 * Returns the user's email, token, and name from local storage.
 * @returns An object containing the user's email, token, and name.
 */
const get_user = (): {
	email: string | null;
	token: string | null;
	name: string | null;
} => {
	return {
		email: cookie_store.get('user-email')?.value as any,
		token: cookie_store.get('user-token')?.value as any,
		name: cookie_store.get('user-name')?.value as any,
	};
};

/**
 * Checks if the user is logged in.
 * @returns True if the user is logged in, false otherwise.
 */
const is_logged_in = (): boolean => {
	// Check if the user is logged in
	if (cookie_store.get('user-email') && cookie_store.get('user-token') && cookie_store.get('user-name')) return true;
	else return false;
};

export { login, logout, get_user, is_logged_in };
