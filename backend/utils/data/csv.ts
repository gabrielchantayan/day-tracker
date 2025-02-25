import { days_since_epoch_to_date_string } from '../misc/date';
import success_handler from '../misc/success-handler';
import { get_user_data } from './data';

/**
 * Sanitizes a string for use in a CSV file.
 *
 * If the string is a number, it is returned as is. Otherwise, it is sanitized
 * to ensure that it does not contain any special characters that could cause
 * issues with the CSV file.
 *
 * @param {string} str The string to sanitize
 * @returns {string} The sanitized string
 */
const sanitize = (str: string): string => {
	// If string is a number, return it as is
	if (typeof str === 'number') {
		return str;
	}

	// If the string contains a comma, it needs to be enclosed in quotes
	if (str.includes(',')) {
		// If the string also contains a double quote, it needs to be escaped
		if (str.includes('"')) {
			str = str.replace(/"/g, '""');
		}
		return `"${str}"`;
	}

	// Otherwise, just return the string
	return str;
};

/**
 * Downloads a CSV file containing the user's data for the specified date range.
 *
 * If `all_time` is specified, the entire history of the user's data is returned.
 *
 * @param {string} user The user's email address
 * @param {string} token The user's token
 * @param {object} date_range A date range object with a `from` and `to` property, both of which are strings in the format 'YYYY-MM-DD'
 * @param {boolean} [all_time=false] If true, the entire history of the user's data is returned
 * @returns {Promise<{ success: boolean, data: string, message: string }>} A promise that resolves with an object containing the success status, the CSV file as a string, and a message
 */
const download_csv = async ({
	user,
	token,
	date_range,
	all_time,
}: {
	user: string;
	token: string;
	date_range: { from: string; to: string };
	all_time?: boolean;
}) => {
	// Find all the days in the specified date range
	// If `all_time` is specified, find all the days for the user
	// Otherwise, find all the days in the specified date range
	const ret = await get_user_data(user, date_range.from, date_range.to, all_time);

	// Create a set of all the keys in the data object
	const headersSet = new Set(['Date']);

	// Create an array of arrays, where each sub-array is a row in the CSV file
	const js = ret.reduce((acc, day) => {
		const dayData = {};
		// Iterate over the key-value pairs in the data object
		for (const [key, value] of Object.entries(day['data'])) {
			// Skip the _id field
			if (key === '_id') continue;
			// Add the key to the set of headers
			headersSet.add(key);
			// Sanitize the value
			if (value.hasOwnProperty('value')) {
				dayData[key] = value['value'];
			} else if (Array.isArray(value)) {
				dayData[key] = sanitize(value.map((v) => v['value'] || v).join(','));
			} else {
				dayData[key] = sanitize(value as string);
			}
		}
		// Add the row to the array
		acc[day.date] = dayData;
		return acc;
	}, {});

	// Convert the set of headers to an array
	const headers = Array.from(headersSet);

	// Create an array of strings, where each string is a row in the CSV file
	const csv = Object.entries(js).map(([date, values]) => {
		// Create an array of strings, where each string is a column in the row
		const row = [days_since_epoch_to_date_string(date as unknown as number)];
		// Iterate over the headers and add the corresponding value to the row
		for (const header of headers) {
			if (header === 'Date') {
				continue;
			}
			row.push(values[header] || '');
		}
		// Join the columns with commas
		return row.join(',');
	});

	// Join the rows with newlines
	const csvContent = headers.join(',') + '\n' + csv.join('\n');

	return success_handler(true, csvContent, 'data.found');
};

export { download_csv };
