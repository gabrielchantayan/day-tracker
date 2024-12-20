import async_wrapper from '../../middleware/async-wrapper';
import { get_prefill as main_function } from '../../utils/data/data';

// Get prefill
// Gets prefill
const get_prefill = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default get_prefill;
