const levels = ['MSG', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'ALL'];
const debug_level = 5;

/**
 * Logs a message
 * @param {number} level The level of the message. Should be one of the debug levels.
 * Defaults to 4
 *
 * 1 - Errors
 * 2 - Warnings
 * 3 - Info
 * 4 - Debug
 * 5 - Everything/Raw Data
 *
 * @param {string} message The message to log
 * @param {string} [prefix="DEBUG"] The prefix to use for the log. Defaults to "DEBUG"
 */
const log = (message: any, level: number = 4, prefix = 'DEBUG') => {
	if (debug_level >= level) {
		console.log(`[${prefix}] (${level}) ${message}`);
	}
};

const log_auth = (message: string, level: number = 4): void => log(message, level, 'AUTH');

const log_db = (message: any, level: number = 4): void => log(message, level, 'DB');

const log_email = (message: string, level: number = 4): void => log(message, level, 'EMAIL');

export { log_db, log_email, log, log_auth };
