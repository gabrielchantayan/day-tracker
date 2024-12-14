import async_wrapper from '../../middleware/async-wrapper';
import { update_data as main_function } from '../../utils/data/data';

// Update data
// Updates data
const update_data = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default update_data;
