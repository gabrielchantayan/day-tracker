import async_wrapper from '../../middleware/async-wrapper';
import { get_summary as main_function } from '../../utils/data/summary';

// Get summary
// Gets a summary of the user's data for the specified date range
const get_summary = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default get_summary;
