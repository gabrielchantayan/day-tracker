import async_wrapper from '../../middleware/async-wrapper';
import { grant_user_token as main_function } from '../../utils/auth/token';

// Grant user token
// Grants a user their token if it exists. If not, it creates a new token
const grant_user_token = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default grant_user_token;
