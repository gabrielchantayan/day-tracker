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


/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function is_object(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function deep_merge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (is_object(target) && is_object(source)) {
    for (const key in source) {
      if (is_object(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deep_merge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deep_merge(target, ...sources);
}

export { convert_time_string_to_ms };