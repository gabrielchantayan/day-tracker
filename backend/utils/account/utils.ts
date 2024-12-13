import { find_one, insert, update } from "../db/db"
import { convert_time_string_to_ms } from "../misc/utils";
import success_handler from "../misc/success-handler";

/**
 * Check if a user has a cooldown of a certain type.
 * @param {string} user The user to check for.
 * @param {string} cooldown The cooldown to check for.
 * @returns {Promise<boolean>} Has the user this cooldown?
 */
const user_has_cooldown = async (user, cooldown_type) => {
    
    // Check if user has a cooldown
    const db_cooldown_item = await find_one('cooldowns', { user: user, cooldown_type: cooldown_type });

    // If the user doesn't have a cooldown return false
    if (!db_cooldown_item) return success_handler(false, null, 'cooldown.not-found');

    // Check the cooldown
    if (Date.now() < db_cooldown_item.cooldown) return success_handler(true, { cooldown: (db_cooldown_item.cooldown - Date.now()) }, 'cooldown.existing');
    else return success_handler(false, null, 'cooldown.expired');
}


/**
 * Sets a cooldown for a user.
 * @param {string} user The user to set the cooldown for.
 * @param {string} cooldown_type The type of cooldown to set.
 * @param {string} cooldown The cooldown to set in the format 'X minutes' or 'X hours'.
 * @returns {Promise<Object>} An object with a 'success' property and a 'message' property.
 */
const user_set_cooldown = async (user, cooldown_type, cooldown) => {  

    // Convert the cooldown to milliseconds
    cooldown = convert_time_string_to_ms(cooldown);

    // Check if user has a cooldown
    const db_cooldown_item = await find_one('cooldowns', { user: user, cooldown_type: cooldown_type });

    // If the user has a cooldown, update it
    if (db_cooldown_item) {
        // Update the cooldown to the current time plus the cooldown
        await update('cooldowns', { user: user, cooldown_type: cooldown_type }, { cooldown: Date.now() + cooldown });

        return success_handler(true, null, 'cooldown.updated');
    }

    // If the user doesn't have a cooldown, insert it
    else {
        // Insert the cooldown with the current time plus the cooldown
        await insert('cooldowns', { user: user, cooldown_type: cooldown_type, cooldown: Date.now() + cooldown });

        return success_handler(true, null, 'cooldown.inserted');
    }
}


const get_user_info = async (user) => {
    console.log(`get_user_info: Getting user info for ${user}`);
    // Get the user's info
    const db_user = await find_one('users', { email: user });
    if (!db_user) {
        console.log(`get_user_info: User not found: ${user}`);
        return success_handler(false, null, 'user.not-found');
    }
    console.log(`get_user_info: Found user info for ${user}`);
    return success_handler(true, db_user, 'user.info');
}


export { user_has_cooldown, user_set_cooldown, get_user_info }