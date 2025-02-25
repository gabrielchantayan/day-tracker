import { get_user_data } from "./data";
import { get_field_data_types } from "../structure/get-structure";
import { log } from "../misc/logger";

export const get_summary = async ({user, token, date_range, all_time}: {user: string, token: string, date_range: {from: string, to: string}, all_time?: boolean}) => {
    
    log(`Getting summary for user ${user}`, 4, 'DATA');
    const data = await get_user_data(user, date_range.from, date_range.to, all_time);
    const structure = await get_field_data_types({user}).then(res => res.data);

    log(`Got structure for ${user}`, 5, 'DATA');


    const totals = {}

    for (const day of data) {
        for (const [key, value] of Object.entries(day.data)) {

            if (!totals[key]) {
                totals[key] = {};
            }

            if (Array.isArray(value)) {
                

                if (structure[key] === 'multi-select') {
                    for (const val of value) {

                        if (!totals[key][val['label']]) {
                            totals[key][val['label']] = 0;
                        }
                        totals[key][val['label']]++;
                    }
                } else {
                    for (const val of value) {
                        if (!totals[key][val]) {
                            totals[key][val] = 0;
                        }
                        totals[key][val]++;
                    }
                }

            } else {
                if (!totals[key][value]) {
                    totals[key][value] = 0;
                }
                totals[key][value]++;
            }
        }


        // Sort the totals by value
        for (const [key, value] of Object.entries(totals)) {
            totals[key] = Object.fromEntries(Object.entries(value).sort((a, b) => b[1] - a[1]));
        }

    }


    console.log(JSON.stringify(totals, null, 4));
}

