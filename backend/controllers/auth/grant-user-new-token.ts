import async_wrapper from '../../middleware/async-wrapper';
import { grant_user_new_token as main_function } from '../../utils/auth/token';

// Grant user new token
// Grants a user a new token
const grant_user_new_token = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default grant_user_new_token;
