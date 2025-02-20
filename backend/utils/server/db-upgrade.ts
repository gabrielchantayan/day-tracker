import { find_all, insert, update } from "../db/db"
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { date_string_to_days_since_epoch } from "../misc/date";

dayjs.extend(utc);


export const upgrade_dates = async () => {
    const days = await find_all('days');
    for (const day of days) {

        // if the object is already updated, skip.
        // this is shown with the veriable "data_version"
        if (day.data_version === 2) {
            continue;
        } 


        day.date = date_string_to_days_since_epoch(day.date);

        day.data_version = 2;

        await update('days', { _id: day._id }, day);
    }
}