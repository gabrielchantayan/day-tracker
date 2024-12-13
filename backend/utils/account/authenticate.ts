import { verify_otp } from '../auth/otp';
import { grant_user_new_token, grant_user_token } from '../auth/token';
import { check_if_exists, insert } from '../db/db';
import success_handler from '../misc/success-handler';
import { get_user_info } from './utils';
import { log } from '../misc/logger';

/*

[0]   first_name: 'Gabriel',
[0]   last_name: 'Chantayan',
[0]   email: 'me@gabrielchantayan.com',
[0]   phone: '+15442232233',
[0]   jobs: [
[0]     {
[0]       title: 'Foo',
[0]       company: 'Bar',
[0]       location: 'Foobar',
[0]       start_date: '2-2023',
[0]       current: true,
[0]       responsibilities: 'R1\nr2\nr3',
[0]       skills: [Array]
[0]     },
[0]     {
[0]       title: 'Beetle Chef',
[0]       company: 'Boston Beel Bem',
[0]       location: 'Beetleland. BG',
[0]       start_date: '02-2021',
[0]       end_date: '9-2023',
[0]       responsibilities: 'Be\nttl\nes'
[0]     }
[0]   ],
[0]   education: [
[0]     {
[0]       institution: 'Edu1',
[0]       field_of_study: 'Ed',
[0]       degree: '1132',
[0]       gpa: '2.34',
[0]       start_date: '10-2032',
[0]       end_date: '2-1932',
[0]       relevant_courses: 'eewew\neweww\newerw\ner',
[0]       clubs_honors_and_awards: 'erm\nerm\nerm\nerm'
[0]     }
[0]   ],
[0]   projects: [
[0]     {
[0]       title: 'Proj1',
[0]       description: 'Proje22e21e1. 12',
[0]       end_date: '08-2020',
[0]       skills: [Array],
[0]       start_date: '12-1920'
[0]     }
[0]   ],
[0]   interests: [
[0]     { value: 'int1', label: 'int1' },
[0]     { value: 'int2', label: 'int2' }
[0]   ],
[0]   skills: [
[0]     { value: 'sk1', label: 'sk1' },
[0]     { value: 'sk3', label: 'sk3' },
[0]     { value: 'sk32', label: 'sk32' }
[0]   ],
[0]   languages: [
[0]     { code: 'Egyptian Arabic', fluency: 'intermediate' },
[0]     { code: 'Aghem', fluency: 'beginner' }
[0]   ]
[0] }

*/

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

	const user_info = await get_user_info(email);

	log(`Login: Got user info for ${email}`);

	return success_handler(
		true,
		{
			token: token.data.token,
			email: email,
			name: `${user_info.data.first_name} ${user_info.data.last_name}`,
		},
		'auth.token.granted'
	);
};

const logout_everywhere = async ({ email }: { email: string }) => {};

export { login };
