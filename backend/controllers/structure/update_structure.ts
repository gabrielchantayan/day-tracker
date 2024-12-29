import async_wrapper from '../../middleware/async-wrapper';
import { update_structure as main_function } from '../../utils/structure/update-structure';

// Update structure
// Updates structure
const update_structure = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default update_structure;
