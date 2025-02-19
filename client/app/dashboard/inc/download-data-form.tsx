'use client';
import { post } from '@/app/assets/js/api';
import { Button } from '@/components/ui/button';
import DateRangePicker from '@/components/ui/date-range-picker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const DownloadDataForm = () => {
	const [dl_uri, setDl_uri] = useState<string | null>(null);

	const download = async () => {
		const ret = await post(['data', 'download_csv'], {
			date_range: date,
			user: 'me@gabrielchantayan.com',
			token: 'me@gabrielchantayan.com',
		});

		console.log(ret.data);

		// Convert the CSV text to a Blob
		const blob = new Blob([ret.data], { type: 'text/csv' });
		// Create a temporary URL for the Blob
		const url = URL.createObjectURL(blob);

		// Set the href of the anchor element to the temporary URL
		setDl_uri(url);
		

	};
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
			{dl_uri && <a id="dl_uri" href={dl_uri} download>Download CSV</a>}
		</div>
	);
};

export default DownloadDataForm;
