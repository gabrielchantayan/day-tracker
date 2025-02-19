import async_wrapper from '../../middleware/async-wrapper';
import { download_csv as main_function } from '../../utils/data/csv';

// Download CSV
// Downloads a CSV file containing the user's data for the specified date range
const download_csv = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default download_csv;
