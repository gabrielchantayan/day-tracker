

/**
 * Gets the current date in the format "YYYY/MM/DD".
 *
 * If it's before 5AM, subtracts 1 day.
 *
 * @returns {string} The current date
 */
export const get_date = (delta: number = 0) => {
    const date = new Date( Date.now() + (delta * 1000 * 60 * 60 * 24) );
    const hours = date.getHours();

    // If it's before 5AM, subtract 1 day
    const day = date.getDate() - (hours < 5 ? 1 : 0) ;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 1) {
        if (month === 1) {
            return `${year - 1}/12/${31 + day}`;
        } else {
            return `${year}/${month - 1}/${31 + day}`;
        }
    }

    return `${year}/${month}/${day}`;
}


// Format a date in locale string with weekday, short month and day
export const format_date = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}