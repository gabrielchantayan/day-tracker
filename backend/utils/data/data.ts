import { find_one, insert, update } from '../db/db';
import { log } from '../misc/logger';
import success_handler from '../misc/success-handler';
import { deep_merge } from '../misc/utils';

export const update_data = async ({ user, date, data }) => {

	// Check if days exist
	const db_day = await find_one('days', { user: user, date: date });
	if (!db_day) insert('days', { user: user, date: date, data: data });
	else update('days', { user: user, date: date }, { data: data });

	const db_prefill = await find_one('prefill', { user: user });
	if (!db_prefill) {
		let prefill = {};

		for (const [key, values] of Object.entries(data)) {
			if (Array.isArray(values)) {
				prefill[key] = values;
			}
		}

		insert('prefill', { user: user, data: prefill });
	} else {
		try {
			let flattened_prefill = {};
			for (const [key, values] of Object.entries(db_prefill.data)) {
				if (Array.isArray(values)) {
					flattened_prefill[key] = values;
				}
			}

			for (const [key, values] of Object.entries(data)) {
				// If the values are not an array, skip
				if (!Array.isArray(values)) continue;

				// If the first value is not an object, skip
				if (typeof values[0] !== 'object') continue;

				if (!flattened_prefill.hasOwnProperty(key)) flattened_prefill[key] = [];
				flattened_prefill[key] = [...flattened_prefill[key], ...[...new Set(values as any)]];
			}

			// Iterate through flattened prefill
			for (let [key, values] of Object.entries(flattened_prefill)) {
				// Remove any null, undefined
				flattened_prefill[key] = [
					...new Set(
						(values as any).filter(
							(value) => value !== null && value !== undefined && JSON.stringify(value) !== '{}'
						)
					),
				];

				// Remove duplicate values
				// The values are objects
				flattened_prefill[key] = [...new Set(flattened_prefill[key].map((value) => JSON.stringify(value)))].map(
					(value) => JSON.parse(value as any)
				);
			}

			log(JSON.stringify(flattened_prefill, null, 2), 5);

			update('prefill', { user: user }, { data: flattened_prefill });
		} catch (e) {
			log(e, 3);
			return success_handler(false, null, 'error.data.could-not-update');
		}
	}

	return success_handler(true, null, 'data.updated');
};

export const get_data = async ({ user, token, date }) => {
	const db_day = await find_one('days', { user: user, date: date });
	if (!db_day) return success_handler(false, null, 'error.data.not-found');
	return success_handler(true, { data: db_day.data }, 'data.found');
};


export const get_prefill = async ({ user }) => {
    const db_prefill = await find_one('prefill', { user: user });
    if (!db_prefill) return success_handler(false, null, 'error.prefill.not-found');
    return success_handler(true, { data: db_prefill.data }, 'prefill.found');
};