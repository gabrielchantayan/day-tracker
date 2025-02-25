import { find, find_one, insert, update } from '../db/db';
import { date_string_to_days_since_epoch } from '../misc/date';
import { log } from '../misc/logger';
import success_handler from '../misc/success-handler';
import { deep_merge } from '../misc/utils';

/**
 * Sorts an array of prefilled options by their label in a case-insensitive manner
 * @param {object[]} prefill - An array of prefilled options
 * @returns {object[]} The sorted array
 */
const sort_prefill = (prefill) => {
	// Sort the prefilled options by their label in a case-insensitive manner
	return prefill.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
};

export const update_data = async ({ date, data }) => {
	const user = 'me@gabrielchantayan.com';
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

				// Sort the values
				flattened_prefill[key] = sort_prefill(flattened_prefill[key]);
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

export const get_data = async ({ token, date }) => {
	const user = 'me@gabrielchantayan.com';

	const db_day = await find_one('days', { user: user, date: date });
	if (!db_day) return success_handler(false, null, 'error.data.not-found');
	return success_handler(true, { data: db_day.data }, 'data.found');
};

export const get_prefill = async ({}) => {
	const user = 'me@gabrielchantayan.com';

	const db_prefill = await find_one('prefill', { user: user });
	if (!db_prefill) return success_handler(false, null, 'error.prefill.not-found');
	return success_handler(true, { data: db_prefill.data }, 'prefill.found');
};

/**
 * Gets the user's data for the supplied date range
 * @param user The user's email address
 * @param from The start date in the format of 'YYYY-MM-DD'
 * @param to The end date in the format of 'YYYY-MM-DD'
 * @returns An array of documents containing the user's data for the specified date range
 */
export const get_user_data_for_supplied_date_range = async (user: string, from: string, to: string): Promise<any[]> => {
	return await find('days', {
		user,
		date: {
			// The date in the database is an integer representing the number of days since the epoch
			// We subtract 1 from the start date and add 1 to the end date to get all the days in the range
			$gte: date_string_to_days_since_epoch(from) - 1,
			$lte: date_string_to_days_since_epoch(to) + 1,
		},
	});
};

export const get_user_data = async (user: string, from: string, to: string, all_time?: boolean) => {
	if (all_time) {
		// Find all the days for the user
		return await find('days', { user });
	} else {
		// Find all the days in the specified date range
		// The date range is inclusive, so we need to subtract 1 from the start date and add 1 to the end date
		// to ensure that we get all the days in the range
		return await get_user_data_for_supplied_date_range(user, from, to);
	}
};
