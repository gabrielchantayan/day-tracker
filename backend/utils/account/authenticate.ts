import { verify_otp } from '../auth/otp';
import { grant_user_new_token, grant_user_token } from '../auth/token';
import { check_if_exists, insert } from '../db/db';
import success_handler from '../misc/success-handler';
import { get_user_info } from './utils';
import { log } from '../misc/logger';


/**
 * Logs in a user with the given email and OTP.
 *
 * @param {string} email The email address to log in with.
 * @param {string} otp The OTP code to use for login.
 * @param {boolean} [reset_token=false] Set to true if the user is logging in
 * after a password reset.
 *
 * @returns {Promise<SuccessHandler>} A promise that resolves to an object with a
 * 'success' property that is true if the login was successful, false otherwise.
 * If the login was not successful, the object will also have an 'error' property
 * that contains the error code. If the login was successful, the object will
 * also have 'token', 'email', and 'name' properties that contain the user's
 * authentication token, email address, and full name.
 */
const login = async ({ email, otp, reset_token = false }: { email: string; otp: string; reset_token?: boolean }) => {
	// Verify the OTP
	log(`Login: Verifying OTP for ${email}`);
	const res = await verify_otp({ email, code: otp });

	if (!res.success) {
		log(`Login: OTP verification failed for ${email}`, 3);
		return res;
	}

	log(`Login: OTP verified for ${email}`);

	const token = await grant_user_token({ email });

    log(`Login: Granted token for ${email}`);



	return success_handler(
		true,
		{
			token: token.data.token,
			email: email,
		},
		'auth.token.granted'
	);
};

const logout_everywhere = async ({ email }: { email: string }) => {};

export { login };
