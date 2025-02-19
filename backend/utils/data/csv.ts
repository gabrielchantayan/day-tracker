import { find } from '../db/mongo';
import success_handler from '../misc/success-handler';

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
 * The CSV file will contain the date in the first column and each key-value pair
 * from the data object as a separate column. The values will be sanitized to
 * ensure that they do not contain any special characters that could cause issues
 * with the CSV file.
 *
 * @param {{ user: string, token: string, date_range: { from: string, to: string } }} options
 * @returns {Promise<string>} The contents of the CSV file
 */
const download_csv = async ({ user, token, date_range }) => {
  const ret = await find('days', { user: user });

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
    const row = [date];
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

/**
 * Converts a date string in the format YYYY/M/D to a Date object.
 * Assumes the time is 00:00:00 +0 UTC.
 *
 * @param {string} dateStr - The date string in the format YYYY/M/D.
 * @returns {Date} - The Date object representing the given date at 00:00:00 UTC.
 */
function convertDateStringToDate(dateStr: string): Date {
	const [year, month, day] = dateStr.split('/').map(Number);
	return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
}

export { download_csv };

function ISODate(dateString: string): Date {
	return new Date(dateString);
}
