import { insert, find_one, update } from "../db/db";
import { log } from "../misc/logger";

// const statistics = { 
//     "date": new Date().toISOString().slice(0, 7),
//     "new_users": 0,
//     "ai_calls": 0,
//     "ai_cost": 0,
// }

/**
 * Add a value to a statistic in the statistics collection.
 * @param {string} statistic The name of the statistic to add to.
 * @param {number} value The value to add to the statistic.
 * @returns {Promise<void>}
 */
const add_stat = async (statistic: string, value: number): Promise<void> => {
    
    
    // Get statistics for "YYYY-MM-DD" from database. 
    const date = new Date().toISOString().slice(0, 10);
    
    log(`Adding ${value} to ${statistic} for ${date}`, 5);

    const stats = await find_one("statistics", {
        "date": date
    });

    if (!stats) {
        // Insert a new document
        await insert("statistics", {
            "date": date,
            [statistic]: value
        })
    }

    else {
        // Check if the statistic already exists
        if (stats[statistic]) {
            // Update the statistic
            await update("statistics", {
                "date": date
            }, {
                [statistic]: stats[statistic] + value
            })
        }

        else {
            // Insert the statistic
            await update("statistics", {
                "date": date
            }, {
                [statistic]: value
            })
        }
    }
}


export {
    add_stat
}

