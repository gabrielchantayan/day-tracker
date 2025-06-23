import { find_all, insert, update } from "../db/db"
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { date_string_to_days_since_epoch, days_since_epoch_to_date_string } from "../misc/date";

dayjs.extend(utc);


export const upgrade_dates = async () => {
    const days = await find_all('days');
    for (const day of days) {

        // if the object is already updated, skip.
        // this is shown with the veriable "data_version"
        if (day.data_version === 2) {
            if (day.date < 0) {
                day.date = days_since_epoch_to_date_string(day.date);
            }

            day.data_version = 3;

            await update('days', { _id: day._id }, day);
            continue;
        } 


        day.date = date_string_to_days_since_epoch(day.date);

        day.data_version = 2;

        await update('days', { _id: day._id }, day);
    }
}