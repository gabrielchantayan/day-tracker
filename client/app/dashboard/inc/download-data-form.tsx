'use client'
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
 




const DownloadDataForm = () => {


   const download = () => {
      window.location.href = '/api/download';
   }
  const [date, setDate] = useState<DateRange>();

   return (
		<div>
			<DateRangePicker onChange={setDate} />
			<Button
				onClick={() => {
					download();
				}}>
				Download Data
			</Button>

         {date && <pre>{JSON.stringify(date, null, 2)}</pre>}
		</div>
   );
}

export default DownloadDataForm