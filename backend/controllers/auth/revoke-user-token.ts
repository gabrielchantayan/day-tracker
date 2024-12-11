import async_wrapper from '../../middleware/async-wrapper';
import { revoke_user_token as main_function } from '../../utils/auth/token';

// Revoke user token
// Revokes a user's token. Used for global logout
const revoke_user_token = async_wrapper(async (req, res) => {

    const ret = await main_function({...req.body});

    res.status(200).json(ret);

});

export default revoke_user_token;
