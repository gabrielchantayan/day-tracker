import { find_one, insert, update } from "../db/db";
import success_handler from "../misc/success-handler";

export const update_data = async (data) => {

    const user = data.user;
    const date = data.date;

    // Check if days exist
    const db_day = await find_one('days', { user: user, date: date });
    if (!db_day) insert('days', { user: user, date: date, data: data.data });
    else update('days', { user: user, date: date }, { data: data.data });

    // update data
    // const res = await update('days', { user: user, date: date }, { data: data.data });

    return success_handler(true, null, 'data.updated');

}