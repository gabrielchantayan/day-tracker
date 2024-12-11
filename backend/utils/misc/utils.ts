/**
 * Convert a string that represents a time duration to milliseconds
 *
 * The string should be in the form of a number followed by a suffix
 *
 * Suffixes:
 * -d: days
 * -h: hours
 * -m: minutes
 * -s: seconds
 *
 * @param time_string The time duration string
 *
 * @returns The time duration in milliseconds
 */
const convert_time_string_to_ms = (time_string: string): number => {
	// Split the string into the time and the suffix
	const time_string_arr = time_string.split('-');
	const time = time_string_arr[0];
	const suffix = time_string_arr[1];

	// Convert the time to milliseconds
	const suffixes: { [key: string]: number } = {
		d: 86400000,
		h: 3600000,
		m: 60000,
		s: 1000,
	};

	// Return the time in milliseconds
	return parseInt(time) * suffixes[suffix];
};

export { convert_time_string_to_ms };