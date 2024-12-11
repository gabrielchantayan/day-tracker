import generate_otp from './generate-otp';
import resend_otp from './resend-otp';
import verify_otp from './verify-otp';
import validate_token from './validate-token';
import grant_user_new_token from './grant-user-new-token';
import grant_user_token from './grant-user-token';
import revoke_user_token from './revoke-user-token';

export default {
	generate_otp,
	resend_otp,
	verify_otp,
	validate_token,
	grant_user_new_token,
	grant_user_token,
	revoke_user_token
};
