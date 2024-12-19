import async_wrapper from '../../middleware/async-wrapper';
import { get_data as main_function } from '../../utils/data/data';

// Get data
// Gets data
const get_data = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default get_data;
