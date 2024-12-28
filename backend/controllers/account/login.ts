import async_wrapper from '../../middleware/async-wrapper';
import { login as main_function } from '../../utils/account/authenticate';

// Login
// Logs in an account
const login = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default login;
