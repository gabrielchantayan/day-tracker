import { update, insert, find_one } from '../db/db';
import success_handler from '../misc/success-handler';
import { validate_token } from '../auth/token';
import { log } from '../misc/logger';
import default_structure from '../structure/default-structure';

const update_structure = async ({ user, token, structure }) => {
	console.log('validating token');

	const validate_token_res = await validate_token({ user: user, token: token });
	if (!validate_token_res.success) console.log('token validation failed');

	// Check if the structure exists
	const existing_structure = await find_one('structures', { user: user });
	if (!existing_structure) {
		log(`Structure not found for user ${user}`, 3, 'STRUCTURES');
		await insert('structures', { user: user, structure: default_structure });
	} else {
		await update('structures', { user: user }, { structure: structure });
	}

	// if (!update_res) await insert('structure', { user: user, structure: structure });

	return success_handler(true, null, 'structure.updated');
};

export { update_structure };
