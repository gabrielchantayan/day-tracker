import async_wrapper from '../../middleware/async-wrapper';
import { get_structure as main_function } from '../../utils/data/structure';

// Get structure
// Gets structure
const get_structure = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default get_structure;
