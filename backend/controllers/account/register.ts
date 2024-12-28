import async_wrapper from '../../middleware/async-wrapper';
import { register as main_function } from '../../utils/account/register';

// Register
// Registers a new account
const register = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default register;
