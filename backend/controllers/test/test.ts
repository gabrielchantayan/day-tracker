import async_wrapper from '../../middleware/async-wrapper';
import { test as main_function } from '../../utils/test';

// Test
// Test API
const test = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default test;
