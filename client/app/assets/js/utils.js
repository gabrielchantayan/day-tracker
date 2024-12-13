

/**
 * Gets the current date in the format "YYYY/MM/DD".
 *
 * If it's before 5AM, subtracts 1 day.
 *
 * @returns {string} The current date
 */
export const get_current_date = () => {
    const date = new Date();
    const hours = date.getHours();

    // If it's before 5AM, subtract 1 day
    const day = date.getDate() - (hours < 5 ? 1 : 0);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
}
